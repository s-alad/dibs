import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../../context/authprovider";
import { useFonts } from 'expo-font';

export default function Login() {

    const [fontsLoaded] = useFonts({'Outfit-Black': require('../../assets/fonts/Outfit-Black.ttf'),});

    const { setUser } = useAuth();

    const login = () => {
        setUser({
            name: "John Doe",
        });
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: '#000' }}>
            <TouchableOpacity onPress={login}>
                <Text style={{color: 'white', fontFamily: "Outfit-Black"}}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}