import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput, ScrollView } from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Easing, useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';


import { Feather, Ionicons, MaterialIcons, MaterialCommunityIcons, } from '@expo/vector-icons';
import { useSegments, useRouter, usePathname, useFocusEffect } from "expo-router";

import * as Location from 'expo-location';
import { useIsFocused } from '@react-navigation/native';
import BottomSheet from '@gorhom/bottom-sheet';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth, app } from "../../services/firebase";

import Loader from "../../components/loader";
import { useAuthContext } from "../../context/authprovider";

import Dib from "../../models/dib";

import { Camera, useCameraPermission, useCameraDevice } from 'react-native-vision-camera'

export default function Snap() {

    const storage = getStorage(app);
    const db = getFirestore(app);

    const { user } = useAuthContext();
    const router = useRouter();

    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [locationstring, setLocationString] = useState<string>("...");

    async function getLocation() {
        //reverse geocode the location
        try {
            const location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            console.log('location', location);
            const locationString = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
            console.log('locationString', locationString);
            setLocationString(
                locationString[0].formattedAddress || "Unknown Location"
            );
        } catch (e) {
            console.error('Error:', e);
        }
    }

    const [uploading, setuploading] = useState<boolean>(false);


    // upload the image, caption, and location to the dibs database
    async function uploadDib() {
        console.log('uploading dib', uploading);
        if (uploading) { return; }
        setuploading(true);

        if (!user || !image || !location) { console.log('fail', location, image, user); return; }
        try {
            // Create a reference to the storage bucket
            const storageRef = ref(storage, "dibs/" + user.uid + "/" + Date.now() + ".jpg");

            // create a blob from the local image
            const blob = await fetch('file://' + image.file.path).then(r => r.blob()).then(blob => { return blob });
            /* const blob = image.blob; */

            // Upload the file
            const snapshot = await uploadBytes(storageRef, blob);
            console.log('Uploaded a blob or file!');

            // Get the download URL for the file
            const downloadURL = await getDownloadURL(storageRef);
            console.log('Download URL:', downloadURL);

            // Now you can store the download URL in Firestore or perform other actions as needed
            const dibsCollection = collection(db, 'dibs');
            const newDib: Dib = {
                creator: {
                    uid: user.uid,
                    anonymousName: user.anonymousName,
                },
                url: downloadURL,
                description: description,
                likes: [],
                reports: [],
                timestamp: Date.now(),
                location: {
                    latitude: location?.coords.latitude,
                    longitude: location?.coords.longitude
                },
                locationstring: locationstring,
            }
            const dibDocRef = await addDoc(dibsCollection, newDib);
            console.log("Document written with ID: ", dibDocRef.id);

            // add this document id to the users myDibs array
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, { myDibs: arrayUnion(dibDocRef.id) });
            console.log("Added dib to user's myDibs array");

            setuploading(false);

            translateY.value = withTiming(-500, {
                duration: 500, // Adjust the duration as needed
                easing: Easing.ease,
            });
            // Wait for the animation to complete
            await new Promise(resolve => setTimeout(resolve, 200));

            setDescription("");
            setLocationString("");
            setImage(null);
            router.replace("/");

        } catch (error) {
            console.error('Error:', error);
        }

        setuploading(false);
    }

    const [image, setImage] = useState<{
        file: {
            path: string,
            width: number,
            height: number
        },
        blob: Blob
    } | null>(null);

    const cameraRef = useRef<Camera>(null);
    const { hasPermission, requestPermission } = useCameraPermission()
    let perms = Camera.getCameraPermissionStatus();
    console.log('perms', perms);
    const device = useCameraDevice('back')
    const [flash, setFlash] = useState("off");

    const isFocused = useIsFocused();

    useEffect(() => {
        console.log('permission', hasPermission);
        requestPermission();
    }, [])


    const translateY = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }],
        };
    });


    if (!hasPermission) {
        return <Loader />;
    }

    if (perms !== "granted") {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Camera permission is required to use this feature.</Text>
                <TouchableOpacity onPress={requestPermission}>
                    <Text>Grant Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (image) {
        return (
            <View 
                style={animatedStyle}
            >

                {
                    uploading &&
                    <View style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 99}}>
                        <ActivityIndicator size="large" color="white" />
                    </View>
                }

                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, alignItems: "center", backgroundColor: 'black', }}
                    style={{ display: "flex", flexDirection: "column", backgroundColor: 'black', height: "100%", width: "100%" }}>


                    <View style={{ width: "100%", display: "flex", paddingTop: 20, paddingLeft: 20, zIndex: 9 }}>
                        <Ionicons name="close" size={32} color="white" onPress={() => { setImage(null) }} />
                    </View>

                    <View style={{ width: "60%", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 9, paddingVertical: 20 }}>
                        <TextInput
                            multiline
                            style={{ color: "white", padding: 10, borderRadius: 10, width: "100%", textAlign: "center", fontSize: 20, }}
                            value={locationstring}
                            onChangeText={text => { setLocationString(text); }}
                        />
                    </View>

                    <View
                        style={{
                            borderRadius: 20,
                            width: "90%",
                            height: 400,
                            minHeight: 400
                            /* aspectRatio: image.file.height / image.file.width, */
                        }}
                    >
                        <Image
                            source={{ uri: 'file://' + image.file.path }}
                            style={{
                                width: "100%", height: "100%", borderRadius: 20,
                            /* aspectRatio: image.file.height / image.file.width,  */resizeMode: "cover"
                            }}
                        />
                    </View>

                    <View style={{ width: "80%", display: "flex", flexDirection: "row", alignItems: "center", zIndex: 9, height: 130 }}>
                        <TextInput
                            multiline
                            style={{ color: "white", padding: 10, borderRadius: 10, width: "100%", textAlign: "center", fontSize: 16, }}
                            placeholder="add a caption ..."
                            placeholderTextColor={"grey"}
                            value={description}
                            onChangeText={text => { setDescription(text); }}
                        />
                    </View>

                    <TouchableOpacity
                        style={{
                            width: "60%", backgroundColor: "#fff", padding: 10, borderRadius: 10,
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                        disabled={uploading}
                        onPress={uploadDib}
                    >
                        <Text style={{ color: "#000", fontSize: 20 }} >post</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'black' }}>
            {device &&
                <Camera
                    style={{ width: "100%", height: "100%", position: "absolute" }}
                    ref={cameraRef}
                    device={device}
                    isActive={true}
                    photo={true}

                >
                </Camera>
            }

            <View style={{ flex: 1, height: "100%", width: "100%", alignItems: "center" }}>

                {/* flash */}
                <TouchableOpacity style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }} onPress={() => { setFlash(flash === "off" ? "on" : "off") }}>
                    <Ionicons name={flash === "off" ? "flash-off" : "flash"} size={32} color="white" />
                </TouchableOpacity>

                {/* circle */}
                <TouchableOpacity style={{ position: "absolute", bottom: "16%", zIndex: 10 }}
                    onPress={
                        async () => {
                            const file = await cameraRef!.current!.takePhoto(
                                {
                                    qualityPrioritization: 'speed',
                                    flash: flash === "on" ? 'on' : 'off',
                                    enableShutterSound: false
                                }
                            )
                            const result = await fetch(`file://${file.path}`)
                            const data = await result.blob();
                            setImage({ file: file, blob: data });
                            getLocation()
                        }
                    }>
                    <Feather name="circle" size={64} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    );
}