import Dib from "../models/dib";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, BackHandler, Image, TouchableWithoutFeedback, Pressable } from "react-native";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
import { getFirestore, doc, updateDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore';
import { app } from "../services/firebase";

import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

import { useAuthContext } from "../context/authprovider";
import { convertToRGBA } from "react-native-reanimated";

interface IListing {
    dib: Dib;
    onPress: () => void;
}

export default function Listing({ onPress, dib }: IListing): JSX.Element {
    const db = getFirestore(app);
    const { user } = useAuthContext();

    const [showCard, setshowCard] = useState(false);
    const [locationString, setLocationString] = useState<string | null>("...");
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
            await updateDoc(dibRef, { likes: arrayUnion(user.uid) });
            await updateDoc(userRef, { likedDibs: arrayUnion(dib.dibId) });
        }
    }

    let [aspect, setAspect] = useState(1);
    Image.getSize(dib.url, (width, height) => {
        setAspect(width / height);
    })

    async function openDeviceMap() {
        const mapurl = `geo:0,0?q=${dib.location.latitude},${dib.location.longitude}`;
        Linking.openURL(mapurl);
    }

    async function getReadableLocation() {
        try {
            let locationGeo = await Location.reverseGeocodeAsync({ latitude: dib.location.latitude, longitude: dib.location.longitude });
            console.log(locationGeo);

            let locationString = `${locationGeo[0].country ?? ""}, ${locationGeo[0].region ?? ""}, ${locationGeo[0].district ?? ""}, ${locationGeo[0].streetNumber ?? ""}, ${locationGeo[0].street ?? ""}, ${locationGeo[0].postalCode ?? ""}`;
            setLocationString(locationString);
        } catch (e) { }

    }
    getReadableLocation();

    return (
        <View style={{ width: "95%", display: "flex", flexDirection: "column", alignItems: "center", backgroundColor: 'black', marginBottom: 8 }}>
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "95%" }}>
                <Text style={{ color: "white", fontFamily: 'Lato', fontSize: 14, }}>This is a header {locationString}</Text>
                <Menu style={{ alignSelf: "flex-end" }}>
                    <MenuTrigger>
                        <Entypo name="dots-three-horizontal" size={24} color="white" />
                    </MenuTrigger>
                    <MenuOptions customStyles={optionsStyles} >
                        <MenuOption value={1} onSelect={() => { onPress(); setshowCard(false) }} style={{ display: "flex", flexDirection: "row", gap: 20, alignItems: "center" }}>
                            <Ionicons name="flag-outline" size={18} color="white" />
                            <Text style={{ color: "white" }}>Report Post</Text>
                        </MenuOption>
                        <MenuOption value={2} onSelect={() => openDeviceMap()} style={{ display: "flex", flexDirection: "row", gap: 20, alignItems: "center" }}>
                            <Feather name="map" size={18} color="white" />
                            <Text style={{ color: "white" }}>Take me there</Text>
                        </MenuOption>

                    </MenuOptions>
                </Menu>
            </View>
            <View style={{width: "100%", position: "relative"}}>
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
                <TouchableOpacity onPress={heart} style ={{position: "absolute", zIndex: 10, bottom: 10, right: 10}}>
                    {
                        liked ?
                            <AntDesign name="heart" size={22} color="red" />
                            :
                            <AntDesign name="hearto" size={22} color="white" />
                    }
                </TouchableOpacity>
            </View>
            {
                !showCard ?
                    ""
                    :
                    <TouchableWithoutFeedback>
                        <View style={styles.card}>
                            <Text style={styles.addy}>
                                {locationString}
                            </Text>
                            <View style={styles.icons}>

                                <TouchableOpacity onPress={heart}>
                                    {
                                        liked ?
                                            <AntDesign name="heart" size={22} color="red" />
                                            :
                                            <AntDesign name="hearto" size={22} color="white" />
                                    }
                                </TouchableOpacity>

                                <TouchableOpacity onPress={openDeviceMap}>
                                    <Feather name="map" size={22} color="white" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => { onPress(); setshowCard(false) }}>
                                    <Ionicons name="flag-outline" size={22} color="white" />
                                </TouchableOpacity>

                            </View>
                        </View>
                    </TouchableWithoutFeedback>
            }


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