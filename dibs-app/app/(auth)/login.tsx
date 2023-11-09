import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../../context/authprovider";
import { useFonts } from 'expo-font';


export default function Login() {

    const provider = new GoogleAuthProvider();

    const [fontsLoaded] = useFonts({
        'Outfit-Regular': require('../../assets/fonts/Outfit-Regular.ttf'),
        'Outfit-Black': require('../../assets/fonts/Outfit-Black.ttf'),
        'Outfit-Light': require('../../assets/fonts/Outfit-Light.ttf'),
        "Outfit-Medium": require("../../assets/fonts/Outfit-Medium.ttf"),
        "Fascinate-Regular": require("../../assets/fonts/Fascinate-Regular.ttf"),
    });

    const { setUser } = useAuth();

    const login = () => {
        setUser({
            name: "John Doe",
        });
    }

    return (
        <View style={{ display: "flex", flex: 1, alignItems: "center"}}>
            <View style={{height: "25%"}}></View> 

            <View style={{width: "80%"}}>
                <TouchableOpacity onPress={login}>
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
            </View>
        </View>
    );
}