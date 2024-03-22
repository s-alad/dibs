import React from "react";
import { Text, View, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { useAuthContext } from "../../context/authprovider";

import * as WebBrowser from "expo-web-browser";

export default function Login() {
    const { user, userLogin, authenticationStatus } = useAuthContext();

    return (
        <View style={{ display: "flex", flex: 1, alignItems: "center", backgroundColor: "black" }}>
            <View style={{ height: "25%" }}></View>

            <View style={{ width: "80%", alignItems: "center" }}>
                {/* <Image source={require("../../assets/bigLogo.png")} style={{ width: 500, height: "50%", alignSelf: "center" }} /> */}
                <TouchableOpacity onPress={() => { userLogin() }}>
                    <View
                        style={{
                            backgroundColor: 'black',
                            width: 50,
                            height: 50,
                            borderRadius: 50 / 2,
                            justifyContent: "center",
                            alignItems: "center",
                            borderColor: "grey",
                            borderWidth: 2,
                        }}
                    >
                        {/* <Image
                            source={require('../../assets/google.png')}
                            style={{ width: 26, height: 26,}}
                        /> */}
                    </View>
                </TouchableOpacity>
                <Text
                    style={{
                        color: 'red',
                        fontFamily: "Outfit-Light",
                        marginTop: 30,
                        fontSize: 15,
                        textAlign: "center",
                    }}
                >
                    {
                        authenticationStatus === "failed" ? "Please enter a valid Boston University email address. " : (
                            authenticationStatus === "started" ? <ActivityIndicator size="small" color="#fff" /> : (
                                authenticationStatus === "authenticated" ? <ActivityIndicator size="small" color="#fff" /> : ""
                            )
                        )
                    }
                </Text>
                <Text style={{ textAlign: "center", marginHorizontal: 30, marginTop: 50, color: "white" }}>
                    This version is currently only available to <Text style={{ fontWeight: "bold" }}>Boston University</Text> students.
                </Text>
            </View>
        </View>
    );
}