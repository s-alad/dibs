import React, { useState } from "react";
import { Image } from "expo-image";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useFonts } from 'expo-font';

export default function Login() {

    const [fontsLoaded] = useFonts({
        'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
        'Outfit-Black': require('../assets/fonts/Outfit-Black.ttf'),
        'Outfit-Light': require('../assets/fonts/Outfit-Light.ttf'),
    });


    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: '#fff' }}>
            <View style={{backgroundColor: "#EFEFEF", height:"40%", width: "100%", borderBottomLeftRadius: 100, borderBottomRightRadius: 100}}>
               
            </View>

            <View style={{ flex: 1, paddingTop: 56, width: "80%", alignItems: "center"}}>
                <Text style={{color: 'black', fontFamily: "Outfit-Regular", fontSize: 45, textAlign: "center"}}>Welcome to Dibs!</Text>
                <Text style={{color: 'black', fontFamily: "Outfit-Light", paddingTop: 20, fontSize: 18, textAlign: "center" }}>A greener solution for getting rid of stuff.</Text>
            </View>
        </View>
    );
}