import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, Button, Pressable } from "react-native";
import { useAuthContext } from "../../context/authprovider";
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Onboard() {
    
    return (
        <View style={{ display: "flex", flex: 1, alignItems: "center", backgroundColor: "black", justifyContent:"center" }}>
            <Text style={{color:"white", fontSize: 25, fontFamily: "lato", textAlign:"center", fontWeight:"bold", marginHorizontal: 50}}>welcome to dibs,
                an app aimed at reducing
                overconsumption. </Text>
            <View style={{flexDirection:"row", gap:6, position:"absolute", left: 40, bottom:40}}>
                <View style={{width:12, height:12, backgroundColor:"white", borderRadius: 12/2, }}/>
                <View style={{width:12, height:12, backgroundColor:"black", borderRadius: 12/2, borderColor:"white", borderWidth:2 }}/>
                <View style={{width:12, height:12, backgroundColor:"black", borderRadius: 12/2, borderColor:"white", borderWidth:2}}/>
            </View>
            <Link replace href="/onboard2" style= {{position:"absolute", bottom:10, right:30}}>
                <Ionicons name="arrow-forward" size={60} color="white"  />
            </Link>
        </View>
    )
}
