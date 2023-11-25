import Dib from "models/dib";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, BackHandler, Image, TouchableWithoutFeedback } from "react-native";

interface IListing {
    dib: Dib;
    onPress: () => void;
}

export default function Listing({ onPress, dib }: IListing): JSX.Element {
    const [showCard, setshowCard] = useState(false);
    const [redHeart, setRedHeart] = useState(false)

    const heart = () => {
        setRedHeart(!redHeart)
    }

    let [aspect, setAspect] = useState(1);
    Image.getSize(dib.url, (width, height) => {
        setAspect(width / height);
    })

    return (
        <View
            style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 30,
            }}
        >
            
            <View
                style={{
                    width: "100%",
                    height: 30,
                    marginBottom: 6,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <View
                        style={{
                            borderRadius: 100,
                            width: 30,
                            height: 30,
                            backgroundColor: 'yellow'
                        }}
                    ></View>
                    <Text>{dib.creator.anonymousName}</Text>
                </View>

                <Text>
                    Posted {new Date(dib.timestamp).toLocaleDateString()}
                </Text>
            </View>
            
            <TouchableOpacity style={styles.square} onPress={() => setshowCard(!showCard)} activeOpacity={1}>
                <Image
                    style={{
                        width: "100%",
                        height: 340,
                        /* aspectRatio: aspect, */
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        resizeMode: "cover",
                    }}
                    source={{
                        uri: dib.url,
                    }}
                />
                {
                    !showCard ?
                        ""
                        :
                        <TouchableWithoutFeedback>
                            <View style={styles.card}><Text style={styles.cardText}>Address</Text>
                                <View style={styles.icons}>
                                    <TouchableOpacity onPress={heart}>
                                        {redHeart && <Image source={require('dibs-app/assets/like.png')} />}
                                        {!redHeart && <Image source={require('dibs-app/assets/whiteHeart.png')} />}
                                    </TouchableOpacity>
                                    <Image source={require('dibs-app/assets/map.png')} />
                                    <TouchableOpacity onPress={() => onPress()}>
                                        <Image source={require('dibs-app/assets/flag.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                }
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    paddingHorizontal: 24,
                }}>
                    <Text style={{
                        color: "black"
                    }} >{dib.description}</Text>
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    square: {
        backgroundColor: "lightgrey",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    card: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 20,
        height: "55%",
        width: "75%",
        alignItems: 'center',
        justifyContent: 'center',
        display: "flex",
        position: "absolute",

    },
    textContainer:
    {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        height: 60,
        width: "100%",
        display: "flex",
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
        flexDirection: "row",
        gap: 30,
        alignItems: "center",
        marginTop: 20
    }

});
