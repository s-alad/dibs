import Dib from "../models/dib";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, BackHandler, Image, TouchableWithoutFeedback, Pressable } from "react-native";
import { AntDesign, Ionicons, Feather, Entypo } from '@expo/vector-icons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
} from "react-native-popup-menu";
import { getFirestore, doc, updateDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore';
import { app } from "../services/firebase";

import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

import { useAuthContext } from "../context/authprovider";

interface IListing {
    dib: Dib;
    onPress: () => void;
}

export default function Listing({ onPress, dib }: IListing): JSX.Element {
    const db = getFirestore(app);
    const { user } = useAuthContext();

    const [locationString, setLocationString] = useState<string | null>("...");
    const [heartAnimation, setHeartAnimation] = useState<boolean>(false);
    const [liked, setLiked] = useState<boolean>(dib.likes.includes(user?.uid || ""));

    async function heart() {
        if (!user || !dib.dibId) { return }
        setLiked(!liked);

        const dibRef = doc(db, 'dibs', dib.dibId);
        const userRef = doc(db, 'users', user.uid);

        if (liked) {
            await updateDoc(dibRef, { likes: arrayRemove(user.uid) });
            await updateDoc(userRef, { likedDibs: arrayRemove(dib.dibId) });
        } else {

            setHeartAnimation(true);
            setTimeout(() => { setHeartAnimation(false); }, 500);

            await updateDoc(dibRef, { likes: arrayUnion(user.uid) });
            await updateDoc(userRef, { likedDibs: arrayUnion(dib.dibId) });
        }
    }

    let [aspect, setAspect] = useState(.5635);
    Image.getSize(dib.url, (width, height) => {
        setAspect(width / height);
        console.log("ASPECT", width / height);
    }, (error) => { 
        setAspect(4/3);
        console.log("ASPECT", error);
    });

    async function openDeviceMap() {
        const mapurl = `geo:0,0?q=${dib.location.latitude},${dib.location.longitude}`;
        Linking.openURL(mapurl);
    }

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            getReadableLocation();

        })();
    }, []);

    async function getReadableLocation() {

        if (dib.locationstring) {
            setLocationString(dib.locationstring);
            return;
        }

        try {
            let locationGeo = await Location.reverseGeocodeAsync({ latitude: dib.location.latitude, longitude: dib.location.longitude });

            let locationString = `${locationGeo[0].district ?? ""} ${locationGeo[0].streetNumber ?? ""} ${locationGeo[0].street ?? ""} ${locationGeo[0].postalCode ?? ""}`;
            setLocationString(locationString);
        } catch (e) { }

    }


    var lastTap: number | null = null
    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            heart();
        } else {
            lastTap = now;
        }
    }

    return (
        <View style={{ width: "95%", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: 'black', marginBottom: 16 }}>

            {/* Card Header */}
            <View style={{ display: "flex", flexDirection: "row", paddingHorizontal: 4, paddingBottom: 6, justifyContent: "space-between", width: "100%", }}>
                <Text style={{ color: "white", fontFamily: 'Lato', fontSize: 14, flex: 1 }}>{locationString}</Text>

                <Menu style={{ alignSelf: "flex-start", marginLeft: 12 }}
                >
                    <MenuTrigger>
                        <Entypo name="dots-three-horizontal" size={24} color="white" />
                    </MenuTrigger>
                    <MenuOptions customStyles={optionsStyles}>
                        <MenuOption
                            value={1} onSelect={() => { onPress(); }}
                            style={{ display: "flex", flexDirection: "row", gap: 12, alignItems: "center" }}
                        >
                            <Ionicons name="flag-outline" size={18} color="white" />
                            <Text style={{ color: "white" }}>Report Post</Text>
                        </MenuOption>
                        <MenuOption
                            value={2} onSelect={() => openDeviceMap()}
                            style={{ display: "flex", flexDirection: "row", gap: 12, alignItems: "center" }}
                        >
                            <Feather name="map" size={18} color="white" />
                            <Text style={{ color: "white" }}>Take me there</Text>
                        </MenuOption>
                        <MenuOption
                            value={3}
                            style={{ position: "absolute", right: -4, top: 0 }}
                        >
                            <Entypo name="dots-three-horizontal" size={24} color="white"
                                style={{ position: "absolute", right: 0, top: -9 }}
                            />
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>

            <TouchableOpacity style={{ width: "100%", position: "relative" }}
                onPress={() => { handleDoubleTap(); }}
                activeOpacity={1}
            >
                <View style={{ width: "100%", position: "relative" }}>
                    <Image
                        style={{
                            width: "100%",
                            height: 340,
                            /* aspectRatio: aspect, */
                            borderTopLeftRadius: 20,
                            borderTopRightRadius: 20,
                            borderBottomLeftRadius: 20,
                            borderBottomRightRadius: 20,
                            resizeMode: "cover",
                        }}
                        source={{
                            uri: dib.url,
                        }}
                    />

                    <View style={{ position: "absolute", zIndex: 10, bottom: 48, right: 26, }}>
                        {/* {heartAnimation ? <Image source={require("../assets/fasterheart.gif")} style={{ height: 50, width: 40 }} /> : null} */}
                    </View>

                    <TouchableOpacity onPress={heart} style={{ position: "absolute", zIndex: 10, bottom: 24, right: 24 }}
                    >
                        {
                            liked ?
                                <AntDesign name="heart" size={22} color="red" />
                                :
                                <AntDesign name="hearto" size={22} color="white" />
                        }
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <View style={{
                    flex: 1,

                    paddingVertical: 12,
                }}>
                    <Text style={{ color: "white" }}>
                        {dib.description}
                    </Text>
                    <Text
                        style={{
                            color: "#898989",
                            fontFamily: 'Lato',
                            fontSize: 10,
                        }}
                    >
                        Posted {new Date(dib.timestamp).toLocaleDateString()}
                    </Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    square: {
        backgroundColor: "black",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1
    },

    card: {
        backgroundColor: 'black',
        borderRadius: 20,
        height: 150,
        width: "80%",
        alignItems: 'center',
        justifyContent: 'center',
        display: "flex",
        position: "absolute",
        zIndex: 1
    },
    textContainer:
    {
        backgroundColor: 'black',
        width: "100%",
        display: "flex",
    },
    addy:
    {
        color: "white",
        fontSize: 16,
        marginBottom: 20
    },
    icons:
    {
        display: "flex",
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
        marginTop: 14
    }

});
const optionsStyles = {
    optionsContainer: {
        backgroundColor: "#161616",
        padding: 5,
        borderRadius: 10,
    },
    optionsWrapper: {
        backgroundColor: "#161616",
    },
    optionWrapper: {
        backgroundColor: "#161616",
        margin: 5,

    },
    optionTouchable: {
        underlayColor: "#161616",
        activeOpacity: 70,
    },
    optionText: {
        color: 'white',
    },
};