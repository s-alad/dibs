import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from "react-native";
import { useAuthContext } from "../../context/authprovider";
import { useFonts } from 'expo-font';

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";

import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { auth } from "../../services/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { TUser } from "../../context/authprovider";


WebBrowser.maybeCompleteAuthSession();

export default function Login() {

    const [fontsLoaded] = useFonts({
        'Outfit-Regular': require('../../assets/fonts/Outfit-Regular.ttf'),
        'Outfit-Black': require('../../assets/fonts/Outfit-Black.ttf'),
        'Outfit-Light': require('../../assets/fonts/Outfit-Light.ttf'),
        "Outfit-Medium": require("../../assets/fonts/Outfit-Medium.ttf"),
        "Fascinate-Regular": require("../../assets/fonts/Fascinate-Regular.ttf"),
    });

    const { user, userLogin, authenticationStatus} = useAuthContext();


    return (

        <View style={{ display: "flex", flex: 1, alignItems: "center"}}>
            <View style={{height: "25%"}}></View> 

            <View style={{width: "80%"}}>
                <TouchableOpacity>
                    <Text style={{color: 'black', fontFamily: "Outfit-Medium", fontSize: 45}}>Log-in</Text>
                </TouchableOpacity>

                <Text
                    style={{
                        color: 'black',
                        fontFamily: "Outfit-Light",
                        paddingTop: 12,
                        fontSize: 15,
                    }}
                >
                    To continue, please use a valid Boston University email google account.
                </Text>
                <TouchableOpacity onPress={
                    () => {
                        userLogin()
                    }
                }>
                    <View 
                        style={{
                            marginTop: 30,
                            backgroundColor: 'black',
                            width: "80%",
                            height: 50,
                            borderRadius: 32,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "row",
                            gap: 20,
                        }}
                    >
                        <Image
                            source={require('../../assets/google.png')}
                            style={{
                                width: 26,
                                height: 26,
                            }}
                        ></Image>
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: "Outfit-Medium",
                                fontSize: 15,
                                textAlign: "center",
                            }}
                        >Login With Google</Text>
                    </View>
                </TouchableOpacity>
                <Text
                    style={{
                        color: 'black',
                        fontFamily: "Outfit-Light",
                        marginTop: 30,
                        fontSize: 15,
                    }}
                >
                    {
                        authenticationStatus === "failed" ? "please ensure you are using a bu.edu email" : (
                            authenticationStatus === "started" ? <ActivityIndicator size="small" color="#000" /> : (
                                authenticationStatus === "authenticated" ? <ActivityIndicator size="small" color="#0000ff" /> : ""
                            )
                        )
                    }
                </Text>
            </View>
        </View>
    );
}