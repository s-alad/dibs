import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, BackHandler, Image, TouchableWithoutFeedback } from "react-native";

interface IListing {
    name: string;
    image: string;
    id: string;
    location: string;
}

export default function Listing({ onPress }) {
    const [showCard, setshowCard] = useState(false);
    const [redHeart, setRedHeart] = useState(false)
    const toggleText = () => {
        setshowCard(!showCard);
    };

    const heart = () => {
        setRedHeart(!redHeart)
    }

  
    return (
        <TouchableOpacity style={styles.square} onPress={toggleText}
        
            activeOpacity={1}
        >
            
            {!showCard && <View style={styles.textContainer}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    marginLeft: 10,
                }}>
                    <Text style={{
                        color: "white"
                    }} >Hello</Text>
                </View>
            </View>}
            {showCard && 
            <TouchableWithoutFeedback>
            <View style = {styles.card}><Text style = {styles.cardText}>Address</Text>
                <View style = {styles.icons}>
                    <TouchableOpacity onPress={heart}>
                        {redHeart && <Image source={require('dibs-app/assets/like.png')}  />}
                        {!redHeart && <Image source={require('dibs-app/assets/whiteHeart.png')}  />}
                    </TouchableOpacity>
                    <Image source={require('dibs-app/assets/map.png')}  />
                    <TouchableOpacity onPress={onPress}>
                    <Image source={require('dibs-app/assets/flag.png')}  />
                    </TouchableOpacity>
                </View>
                
            </View>
            </TouchableWithoutFeedback>}
            
        </TouchableOpacity>
        

    )


}
const styles = StyleSheet.create({
    square: {
        backgroundColor: "lightgrey",
        borderRadius: 20,
        width: "90%",
        height: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 18,
        margin: 10,
        
    },

    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius :20,
        height: "55%",
        width: "75%",
        alignItems: 'center',
        justifyContent: 'center',
       display: "flex",
       position: "absolute",
       
    },
    textContainer:
    {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 12,
        height: "12%",
        width: "90%",
        display: "flex",
        position:"absolute",
        bottom:20
    },
    cardText:
    {
        color: "white",
        fontSize: 16,
        marginBottom: 20
    },
    icons:
    {
        display: "flex",
        flexDirection:"row",
        gap: 30,
        alignItems: "center",
        marginTop: 20
    }
    
});
