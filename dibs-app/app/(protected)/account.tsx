import React, { useState, useCallback, useMemo, useRef } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

import { useFocusEffect } from "expo-router";
import { useAuthContext } from "../../context/authprovider";

import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "../../services/firebase";

import Loader from "../../components/loader";
import Listing from "../../components/listing";
import Report from "../../components/report";

import Dib from "../../models/dib";


export default function Account() {
    const { userLogout, user } = useAuthContext();
    const db = getFirestore(app);

    let [fetchingLikedDibs, setFetchingLikedDibs] = useState<boolean>(true);
    let [likedDibs, setLikedDibs] = useState<Dib[]>([]);

    async function getLikedDibs() {
        if (!user) { return }

        try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists() && userDoc.data()?.likedDibs) {
                const likedDibsIds: string[] = userDoc.data().likedDibs;
                console.log("[LIKED] liked dib ids - ", likedDibsIds)

                const dibsCollection = collection(db, 'dibs');
                const likedDibsQuery = query(dibsCollection, where('__name__', 'in', likedDibsIds));
                const likedDibsSnapshot = await getDocs(likedDibsQuery);

                let ndibs: Dib[] = [];
                likedDibsSnapshot.forEach((doc) => {
                    const id = doc.id;
                    const data = doc.data();
                    ndibs.push(new Dib(data, id));
                });
                setLikedDibs(ndibs);
            }
        } catch (e) { console.log("[FETCH LIKED DIBS] Error", e); }
    }

    useFocusEffect(
        useCallback(() => {
            console.log("[FETCH LIKED DIBS] ====================================");
            getLikedDibs().then(() => { setFetchingLikedDibs(false); });

            return () => {
                console.log("[ACCOUNT UNFOCUS] ------------------------------------- \n"); console.log();
                setFetchingLikedDibs(true);
            }
        }, [])
    );

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '75%'], []);
    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />, []);
    const handlePresentModalPress = useCallback(() => { bottomSheetModalRef.current?.present(); }, []);

    return (
        <BottomSheetModalProvider>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white", paddingTop: 20 }}>
                <TouchableOpacity onPress={userLogout} style={{ alignSelf: "flex-start", left: 30, top: 20, position: 'absolute', zIndex: 9 }}>
                    <Ionicons name="exit-outline" size={24} color="black" />
                </TouchableOpacity>

                <Image source={require('dibs-app/assets/Ellipse.png')} style={{ width: 120, height: 120, borderRadius: 200 / 2 }} />
                <Text style={{ fontSize: 25, marginBottom: 10 }}>{user?.anonymousName}</Text>

                {
                    fetchingLikedDibs ? <Loader text="Fetching liked dibs..." load={true} /> :
                        likedDibs.length == 0 ? <Loader text="No liked dibs found." load={false} /> :
                            <>
                                <ScrollView
                                    style={{
                                        width: "100%",
                                    }}
                                    centerContent={true}
                                >
                                    {
                                        likedDibs.map((d, i) => (
                                            <View style={{ alignItems: "center" }} key={i}>
                                                <Image source={require('dibs-app/assets/like.png')} style={{ alignSelf: "flex-end", marginRight: "6%" }} />
                                                <Listing onPress={handlePresentModalPress} dib={d} />
                                            </View>
                                        ))
                                    }
                                </ScrollView>
                                <BottomSheetModal
                                    ref={bottomSheetModalRef}
                                    index={1}
                                    snapPoints={snapPoints}
                                    backgroundStyle={{
                                        backgroundColor: 'black'
                                    }}
                                    handleIndicatorStyle={{
                                        backgroundColor: "grey"
                                    }}
                                    backdropComponent={renderBackdrop}
                                >
                                    <Report />
                                </BottomSheetModal>
                            </>
                }
            </View>
        </BottomSheetModalProvider>
    );
}
