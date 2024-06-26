import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import { useRouter } from "expo-router";

import World from "../../assets/world.png";

export default function Welcome() {

    const router = useRouter();

    return (
        <View style={{ display: "flex", flex: 1, alignItems: "center", backgroundColor: '#fff' }}>

            <View style={{backgroundColor: "#EFEFEF", height:"40%", width: "100%", borderBottomLeftRadius: 100, borderBottomRightRadius: 100}}>
                <Image source={World} style={{
                    width: 240,
                    height: 240,
                    resizeMode: 'contain',
                    alignSelf: 'center',
                    marginTop: 100,
                    borderColor: 'red',

                }}/>
            </View>

            <View style={{ flex: 1, paddingTop: 56, width: "80%", alignItems: "center"}}>
                <Text style={{color: 'black', fontFamily: "Outfit-Regular", fontSize: 45, textAlign: "center"}}>Welcome to Dibs!</Text>
                <Text style={{color: 'black', fontFamily: "Outfit-Light", paddingTop: 20, fontSize: 18, textAlign: "center" }}>A greener solution for getting rid of stuff.</Text>
            
                <TouchableOpacity
                    onPress={() => router.replace("/login")}
                >
                    <View style={{
                        marginTop: 56,
                        backgroundColor: "black",
                        width: 200,
                        borderRadius: 25,
                        height: 48,
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <Text
                            style={{
                                color: "white",
                                textAlign: "center",
                                fontFamily: "Outfit-Regular",
                                fontSize: 16,
                            }}
                        >Continue</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}