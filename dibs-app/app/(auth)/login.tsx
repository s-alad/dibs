import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../../context/authprovider";


export default function Login() {
    const { setUser } = useAuth();

    const login = () => {
        setUser({
            name: "John Doe",
        });
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'yellow' }}>
            <TouchableOpacity onPress={login}>
                <Text style={{color: 'red'}}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}