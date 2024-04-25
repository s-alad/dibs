import React, { useState } from "react";
import { Text, View, TouchableOpacity, Image, ActivityIndicator, Pressable, TextInput } from "react-native";
import { useAuthContext } from "../../context/authprovider";

import BigLogo from "../../assets/bigLogo.png";
import GoogleLogo from "../../assets/google.png";

export default function Login() {
    const { user, userLogin, authenticationStatus, userLoginEmailPassword } = useAuthContext();
    const [emailpass, setEmailPass] = useState(false)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <View style={{ display: "flex", flex: 1, alignItems: "center", backgroundColor: "black" }}>
            <View style={{ height: "25%" }}></View>

            <View style={{ width: "80%", alignItems: "center" }}>
                <Pressable
                    onPress={() => { setEmailPass(!emailpass) }}
                >
                    <Image source={BigLogo} style={{ width: 500, height: "50%", alignSelf: "center" }} />
                </Pressable>

                {
                    emailpass ?
                        <View 
                            style={{
                                width: "100%",
                                alignItems: "center",
                                marginTop: -80,
                            }}
                        >
                            <TextInput
                                style={{
                                    backgroundColor: "white",
                                    width: "80%",
                                    height: 50,
                                    borderRadius: 10,
                                    padding: 10,
                                    marginTop: 20,
                                }}
                                placeholder="Email"
                                onChangeText={(text) => setEmail(text)}
                            />
                            <TextInput
                                style={{
                                    backgroundColor: "white",
                                    width: "80%",
                                    height: 50,
                                    borderRadius: 10,
                                    padding: 10,
                                    marginTop: 20,
                                }}
                                placeholder="Password"
                                onChangeText={(text) => setPassword(text)}
                            />
                                

                            <TouchableOpacity
                                onPress={() => { 
                                    userLoginEmailPassword(email, password);
                                }}
                                style={{
                                    borderBlockColor: "white",
                                    borderColor: "white",
                                    borderWidth: 1,
                                    width: "80%",
                                    height: 50,
                                    borderRadius: 10,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 20,
                                }}
                            >  
                                <Text style={{ color: "white", fontSize: 20 }}>Login</Text>
                            </TouchableOpacity>
                        </View> :

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
                                <Image
                                    source={GoogleLogo}
                                    style={{ width: 26, height: 26, }}
                                />
                            </View>
                        </TouchableOpacity>
                }
                <Text
                    style={{
                        color: 'red',
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