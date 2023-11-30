import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ActivityIndicator, Button, Pressable } from "react-native";
import { pictures } from "../../util/profilePictures";
import { useAuthContext } from "../../context/authprovider";

export default function Onboard() {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleImagePress = (index: number) => {
    setSelectedImageIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const renderImages = () => {
    const images = [
      require('dibs-app/assets/Ellipse1.png'),
      require('dibs-app/assets/Ellipse2.png'),
      require('dibs-app/assets/Ellipse3.png'),
      require('dibs-app/assets/Ellipse4.png'),
    ];

    return images.map((image, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => handleImagePress(index)}
        style={[
          styles.imageContainer,
          selectedImageIndex === index && styles.selectedImage,
        ]}
      >
        <Image source={image} style={styles.image} />
      </TouchableOpacity>
    ));
  };

    const { user, userOnboard } = useAuthContext();

    return (
        <>
            <Text style={styles.text}>You're In!</Text>
            <Text style={styles.subtext}>Select a profile photo:</Text>
            <View style={styles.imageContainer}>
                <View style={styles.row}>{renderImages().slice(0, 2)}</View>
                <View style={styles.row}>{renderImages().slice(2)}</View>
            </View>
            <Pressable style={styles.button}
                onPress={() => userOnboard()}
            
            ><Text style={styles.textButton}>CONTINUE</Text></Pressable>

            
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
     },
     selectedImage: {
       borderColor: "black",
       borderWidth: 2,
       borderRadius: 200 / 2 
      },
})