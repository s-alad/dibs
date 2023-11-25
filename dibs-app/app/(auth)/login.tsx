import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator } from "react-native";
import { useAuthContext } from "../../context/authprovider";

import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();

export default function Login() {
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