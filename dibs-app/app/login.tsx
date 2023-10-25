import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import { auth, db, gprovider } from "../services/firebase"

export default function Login() {


    async function login() {
        try {
            signInWithPopup(auth, gprovider).then(
                (result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential?.accessToken;

                    console.log(token);

                }
            )
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View>
            <Text>hiello</Text>
            <TouchableOpacity onPress={login}>
                <Text>Google Login</Text>
            </TouchableOpacity>
        </View>
    )
}