import { useSegments, useRouter, usePathname } from "expo-router";
import { createContext, useContext, useEffect, useState, useRef } from "react";

import { auth, db, app} from "../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut} from "firebase/auth";
import { collection, addDoc, getDoc, query, where, doc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import getRandomName from "../util/anonymous";

export type TUser = {
    uid: string;
    displayName: string;
    anonymousName: string;
    email: string;
    raw: string;
}

export type AuthType = {
    user: TUser | null;
    authenticationStatus?: TAuthenticationStatus;
    userLogin: () => void;
    userLoginEmailPassword: (email: string, password: string) => void;
    userLogout: () => void;
    userOnboard: () => void;
}

type TAuthenticationStatus = "initial" | "started" | "authenticated" | "failed" | "error" | "onboarding";

const AuthContext = createContext<AuthType>({
    user: null,
    authenticationStatus: "initial",
    userLogin: () => { },
    userLoginEmailPassword: () => { },
    userLogout: () => { },
    userOnboard: () => { },
});

export const useAuthContext = () => useContext(AuthContext);

function useProtectedRoute(user: TUser | null, startedAuthentication: TAuthenticationStatus) {
    const segments = useSegments();
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        const inAuthGroup = segments[0] === "(auth)";
        const currentRoute = pathname
        // If the user is not signed in and the initial segment is not anything in the auth group.
        if (startedAuthentication === "started") {
            if (pathname !== "/login") { router.replace("/login"); }
        }
        else if (!user && !inAuthGroup ) {
            if (pathname !== "/login") { router.replace("/login"); } // Redirect to the welcome page.
        } else if (user && inAuthGroup) { // Redirect away from the sign-in page.
            if (startedAuthentication === "onboarding") {
                router.replace("/onboard")
            }
            else {
                router.replace("/")
            }; 
        }
    }, [user, segments, startedAuthentication]);
}

WebBrowser.maybeCompleteAuthSession();

export function AuthProvider({ children }: { children: JSX.Element }): JSX.Element {
    const [user, setUser] = useState<TUser | null>(null);
    const [authenticationStatus, setAuthenticationStatus] = useState<TAuthenticationStatus>("initial");

    //and 88888880719-i08or0ekkjjujj2q5769a9lt85ooqcku.apps.googleusercontent.com
    //ios 88888880719-da9q6e4nbh1rvednqemm892luabnjfoj.apps.googleusercontent.com
    //web 88888880719-vdl1hcjfn2793ncl3sep1orpq3b060p9.apps.googleusercontent.com 
    const [request, response, promptAsync] = Google.useAuthRequest({
        iosClientId: "88888880719-da9q6e4nbh1rvednqemm892luabnjfoj.apps.googleusercontent.com",
        androidClientId: "88888880719-i08or0ekkjjujj2q5769a9lt85ooqcku.apps.googleusercontent.com",
        webClientId: '88888880719-vdl1hcjfn2793ncl3sep1orpq3b060p9.apps.googleusercontent.com'
    })

    async function userExistsInFirestore(user: TUser) {
        const userDocRef = doc(collection(db, 'users'), user.uid);
        const userDoc = await getDoc(userDocRef);
        return userDoc.exists();
    }

    async function addUserToFirestore(user: TUser) {
        const userExistsAlready = await userExistsInFirestore(user);

        if (!userExistsAlready) {
            setAuthenticationStatus("onboarding")
            const userCollection = collection(db, 'users');
            const userDocRef = doc(userCollection, user.uid);
            await setDoc(userDocRef, {
                email: user.email,
                displayName: user.displayName,
                anonymousName: user.anonymousName,
                uid: user.uid,
                raw: user.raw,
                likedDibs: [],
                myDibs: [],
                selectedPicture: -1,
            });
        }
        else{
        setAuthenticationStatus("authenticated");}
    }
    
    // check if user exists in async storage, if so, set user
    useEffect(() => {
        if (user) { return }
        console.log("[AS] - CHECK IF USER EXISTS")
        AsyncStorage.getItem("@user").then((res) => {
            console.log(res)
            if (res) {
                setUser(JSON.parse(res));
            }
        }).catch((err) => { console.log(err) })
    }, [])

    useEffect(() => {
        console.log("[UE] - RESPONSE RENDER")
        console.log(authenticationStatus)

        if (user) { return }
        if (response?.type === "success" && authenticationStatus === "started") {
            const { id_token } = response.params;
            console.log("INSIDE RESPONSE")
            console.log("response", response.params)
            const credential = GoogleAuthProvider.credential(id_token);
            console.log("-----")
            signInWithCredential(auth, credential).then((res) => {
                console.log(res)
                let resuser = res.user;

                if (resuser && resuser.email) {

/*                     if (resuser.email.split("@")[1] !== "bu.edu") {
                        console.log("NOT A BU EMAIL")
                        setAuthenticationStatus("failed");
                        return;
                    } */

                    let nuser: TUser = {
                        uid: resuser.uid,
                        displayName: resuser.displayName || "",
                        anonymousName: "Anonymous " + getRandomName(),
                        email: resuser.email,
                        raw: JSON.stringify(resuser),
                    }

                    AsyncStorage.setItem("@user", JSON.stringify(nuser)).then(async () => {
                        console.log("SET USER")
                        setUser(nuser);
                        await addUserToFirestore(nuser);
                        WebBrowser.dismissBrowser();
                        
                    }).catch((err) => {
                        console.log(err)
                    })
                }
            })
        }
        if (response?.type === "cancel") {
            console.log("CANCELLED")
            setAuthenticationStatus("initial");
        }
    }, [response]);

    async function userLogin() {
        console.log("[UL] - LOGIN")
        setAuthenticationStatus("started");

        promptAsync().then((res) => {
            console.log(res)
            if (res.type === "dismiss") {
                setAuthenticationStatus("initial");
            }
        }).catch((err) => { console.log(err) })
    }

    async function userLoginEmailPassword(email: string, password: string) {
        console.log("[UL] - LOGIN EMAIL PASSWORD")
        setAuthenticationStatus("started");
        signInWithEmailAndPassword(auth, email, password).then((res) => {
            let resuser = res.user;
            if (resuser && resuser.email) {
                let nuser: TUser = {
                    uid: resuser.uid,
                    displayName: resuser.displayName || "",
                    anonymousName: "Anonymous " + getRandomName(),
                    email: resuser.email,
                    raw: JSON.stringify(resuser),
                }

                AsyncStorage.setItem("@user", JSON.stringify(nuser)).then(async () => {
                    console.log("SET USER")
                    setUser(nuser);
                    await addUserToFirestore(nuser);
                    WebBrowser.dismissBrowser();
                }).catch((err) => {
                    console.log(err)
                })
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    async function userLogout() {
        console.log("[UL] - LOGOUT")
        await signOut(auth);
        await AsyncStorage.removeItem("@user").then(() => {
            setUser(null);
            setAuthenticationStatus("initial");
        }).catch((err) => { console.log(err) })
    }

    async function userOnboard() {
        console.log("[UL] - ONBOARD")
        setAuthenticationStatus("authenticated");
    }

    useProtectedRoute(user, authenticationStatus);

    const authContext: AuthType = {
        user,
        userLogin,
        userLoginEmailPassword,
        userLogout,
        userOnboard,
        authenticationStatus,
    };

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
}