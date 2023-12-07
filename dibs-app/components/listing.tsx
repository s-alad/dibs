import Dib from "../models/dib";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, BackHandler, Image, TouchableWithoutFeedback } from "react-native";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';

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
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 30,
            }}
        >
            
            <View
                style={{
                    width: "100%",
                    height: 30,
                    marginBottom: 6,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <View
                        style={{
                            borderRadius: 100,
                            width: 30,
                            height: 30,
                            backgroundColor: 'yellow'
                        }}
                    >
                    </View>

                    <Text
                        style={{
                            color: "white",
                            fontFamily: 'Lato',
                            fontSize: 13,
                        }}
                    >
                        {dib.creator.anonymousName.replace(/\b\w/g, l => l.toUpperCase())}
                    </Text>

                </View>

                
            </View>
            
            <TouchableOpacity style={styles.square} onPress={() => setshowCard(!showCard)} activeOpacity={1}>
                <Image
                    style={{
                        width: "100%",
                        height: 340,
                        /* aspectRatio: aspect, */
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius:20,
                        resizeMode: "cover",
                    }}
                    source={{
                        uri: dib.url,
                    }}
                />
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

                                    <TouchableOpacity onPress={() => {onPress(); setshowCard(false)}}>
                                        <Ionicons name="flag-outline" size={22} color="white" />
                                    </TouchableOpacity>

                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                }
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <View style={{
                    flex: 1,
                    
                    paddingVertical: 12,
                }}>
                    <Text style={{color: "white"}}>
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
