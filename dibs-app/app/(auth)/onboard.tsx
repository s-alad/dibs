import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, Button, Pressable } from "react-native";
import { pictures } from "../../util/profilePictures";
export default function Onboard() {
    
    return (
        <>
            <Text style={styles.text}>You're In!</Text>
            <Text style={styles.subtext}>Select a profile photo:</Text>
            <View style={styles.imageContainer}>
                <View style = {styles.row}>
                <Image source={require('dibs-app/assets/Ellipse1.png')} style={styles.image} />
                <Image source={require('dibs-app/assets/Ellipse2.png')} style={styles.image} />
                </View>
                <View style = {styles.row}>
                <Image source={require('dibs-app/assets/Ellipse3.png')} style={styles.image} />
                <Image source={require('dibs-app/assets/Ellipse4.png')} style={styles.image} />
                </View>
            </View>
            <Pressable style={styles.button}><Text style={styles.textButton}>CONTINUE</Text></Pressable>

            
        </>
    )
}
const styles = StyleSheet.create({
    text:{
        fontSize: 60,
        textAlign: "center",
        marginTop: "40%"
    },
    subtext:{
        fontSize: 25,
        textAlign: "center",
        marginTop:"10%",
       
    },
    imageContainer:{
        display: "flex",
        alignItems: "center",
        marginTop:10
    },
    image:{
        width: 120, height: 120, borderRadius: 200 / 2 
     },
     row:{
        display:"flex",
        flexDirection: "row",
        margin: 15,
        gap: 10

     },
     button: {
        backgroundColor: "black",
        height: 60,
        width: "95%",
        borderRadius: 30,
        margin: 10,
        marginTop: 35,
        justifyContent: 'center',
        alignItems:"center"
     },
     textButton:{
        color: "white"
     }
})