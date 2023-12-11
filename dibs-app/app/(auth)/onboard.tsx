import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, Button, Pressable } from "react-native";
import { useAuthContext } from "../../context/authprovider";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
export default function Onboard() {
    const {user, userOnboard} = useAuthContext();
    const [page, setPage] = useState(0)
    const addPage = () =>{
        setPage(page + 1)
    }
    const getPage = () => {
        if (page === 0) {
            return (
                <>
                    <Text style={{ color: "white", fontSize: 25, fontFamily: "lato", textAlign: "center", fontWeight: "bold", marginHorizontal: 60 }}>welcome to dibs,
                        an app aimed at reducing
                        overconsumption. </Text>
                    <View style={{ flexDirection: "row", gap: 6, position: "absolute", left: 40, bottom: 40 }}>
                        <View style={{ width: 12, height: 12, backgroundColor: "white", borderRadius: 12 / 2, }} />
                        <View style={{ width: 12, height: 12, backgroundColor: "black", borderRadius: 12 / 2, borderColor: "white", borderWidth: 2 }} />
                        <View style={{ width: 12, height: 12, backgroundColor: "black", borderRadius: 12 / 2, borderColor: "white", borderWidth: 2 }} />
                    </View>
                    <TouchableOpacity onPress = {()=>addPage()}style={{ position: "absolute", bottom: 10, right: 30 }}>
                        <Ionicons name="arrow-forward" size={60} color="white" />
                    </TouchableOpacity>
                </>
            )
        }
        else if (page ===1){
            return (
                <>
                    <Text style={{ color: "white", fontSize: 25, fontFamily: "lato", textAlign: "center", fontWeight: "bold", marginHorizontal: 50 }}>easily upload your
unwanted items </Text>
                    <Image source={require("../../assets/cameraScreen.png")}/>
                    <View style={{ flexDirection: "row", gap: 6, position: "absolute", left: 40, bottom: 40 }}>
                        <View style={{ width: 12, height: 12, backgroundColor: "black", borderRadius: 12 / 2, borderColor: "white", borderWidth: 2 }} />
                        <View style={{ width: 12, height: 12, backgroundColor: "white", borderRadius: 12 / 2, }} />
                        <View style={{ width: 12, height: 12, backgroundColor: "black", borderRadius: 12 / 2, borderColor: "white", borderWidth: 2 }} />
                    </View>
                    <TouchableOpacity onPress = {()=>addPage()}style={{ position: "absolute", bottom: 10, right: 30 }}>
                        <Ionicons name="arrow-forward" size={60} color="white" />
                    </TouchableOpacity>
                </>
            )
        }
        else{
            return(
                <>
                    <Image source={require("../../assets/feedScreen.png")}/>
                    <Text style={{ color: "white", fontSize: 25, fontFamily: "lato", textAlign: "center", fontWeight: "bold", marginHorizontal: 50 }}>browse free
items near you</Text>
                    <View style={{ flexDirection: "row", gap: 6, position: "absolute", left: 40, bottom: 40 }}>
                        <View style={{ width: 12, height: 12, backgroundColor: "black", borderRadius: 12 / 2, borderColor: "white", borderWidth: 2 }} />
                        <View style={{ width: 12, height: 12, backgroundColor: "black", borderRadius: 12 / 2, borderColor: "white", borderWidth: 2 }} />
                        <View style={{ width: 12, height: 12, backgroundColor: "white", borderRadius: 12 / 2, }} />
                    </View>
                    <TouchableOpacity onPress = {()=>userOnboard()}style={{ position: "absolute", bottom: 10, right: 30 }}>
                        <Ionicons name="arrow-forward" size={60} color="white" />
                    </TouchableOpacity>
                </>
            )
        }
    }
    useEffect(() => {
      }, [page]);
    return (
        <View style={{ display: "flex", flex: 1, alignItems: "center", backgroundColor: "black", justifyContent: "center" }}>
            {getPage()}
        </View>
    )
}
