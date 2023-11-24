import React, { useState } from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity, BackHandler, Image, TouchableWithoutFeedback } from "react-native";

interface IListing {
    name: string;
    image: string;
    id: string;
    location: string;
}

interface ListingProps {
    onPress: () => void;
}

const Listing: React.FC<ListingProps> = ({ onPress }) => {
    const [showCard, setshowCard] = useState(false);
    const [redHeart, setRedHeart] = useState(false)
    const toggleText = () => {
        setshowCard(!showCard);
    };

    const heart = () => {
        setRedHeart(!redHeart)
    }


    return (
        <>
            <View
                style={{
                    width: "90%",
                    height: 30,
                    marginTop: 10,
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
                    <Text>Anonymous Animal</Text>
                </View>

                <Text>
                    Posted x days ago
                </Text>
            </View>
            <TouchableOpacity style={styles.square} onPress={toggleText} activeOpacity={1}>
                {
                    !showCard ?
                        <View style={styles.textContainer}>
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                paddingHorizontal: 24,
                            }}>
                                <Text style={{
                                    color: "black"
                                }} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.</Text>
                            </View>
                        </View>
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
        </>
    )
}
export default Listing;
const styles = StyleSheet.create({
    square: {
        backgroundColor: "lightgrey",
        borderRadius: 20,
        width: "90%",
        height: 310,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 18,
        marginBottom: 20,
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
        backgroundColor: 'rgba(239, 238, 238, 0.8)',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        height: "25%",
        width: "100%",
        display: "flex",
        position: "absolute",
        bottom: 0
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
