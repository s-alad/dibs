import { View, Text, TouchableOpacity, ScrollView,  StyleSheet } from "react-native";
import React, {useCallback, useMemo, useRef } from "react";
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import Listing from "../../components/listing";
import Report from "../../components/report";

export default function Home() {
    const [fontsLoaded] = useFonts({
        'Outfit-Regular': require('../../assets/fonts/Outfit-Regular.ttf'),
        'Outfit-Black': require('../../assets/fonts/Outfit-Black.ttf'),
        'Outfit-Light': require('../../assets/fonts/Outfit-Light.ttf'),
        "Outfit-Medium": require("../../assets/fonts/Outfit-Medium.ttf"),
        "Fascinate-Regular": require("../../assets/fonts/Fascinate-Regular.ttf"),
    });

    let listings = [
        "listigng1",
        "listing2",
        "listing3",
        "listing4"
    ]

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // variables
    const snapPoints = useMemo(() => ['25%', '75%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <BottomSheetModalProvider>
            <View style={{ display: "flex", flex: 1, alignItems: "center" }}>

                <View style={{ padding: 12 }}>
                    <Text style={{ fontSize: 18, fontFamily: "Fascinate-Regular", }}>Dibs!</Text>
                </View>

                <ScrollView
                    style={{ width: "100%" }}
                    centerContent={true}
                >
                    {
                        listings.map((p, i) => (
                            <View style={{
                                alignItems: "center"
                            }}
                                key={i}
                            >
                                <Listing onPress={handlePresentModalPress} />
                            </View>
                        ))
                    }
                </ScrollView>
                
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backgroundStyle={{
                        backgroundColor: 'black'
                        }}
                    handleIndicatorStyle ={{
                        backgroundColor:"grey"
                    }}
                >
                    <Report/>
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
}
