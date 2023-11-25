import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Listing from "../../components/listing";
import Divider from "../../components/divider";
import Report from "../../components/report";
import React, { useState, useCallback, useMemo, useRef } from "react";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import { useAuthContext } from "../../context/authprovider";


export default function Account() {
    let liked = [
        "listigng1",
        "listing2",
        "listing3",
        "listing4"
    ]

    const { userLogout, user } = useAuthContext();

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
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white", paddingTop: 20 }}>
                <TouchableOpacity onPress={userLogout} style={{ alignSelf: "flex-start", left: 30, top: 20, position: 'absolute', zIndex: 9 }}>
                    <Image source={require('dibs-app/assets/exit.png')} />
                </TouchableOpacity>

                <Image source={require('dibs-app/assets/Ellipse.png')} style={{ width: 120, height: 120, borderRadius: 200 / 2 }} />
                <Text style={{ fontSize: 25, marginBottom: 10 }}>{user?.email}</Text>
                <ScrollView
                    style={{
                        width: "100%",
                    }}
                    centerContent={true}
                >
                    {
                        liked.map((p, i) => (
                            <View style={{ alignItems: "center" }} key={i}>
                                {/* <Image source={require('dibs-app/assets/like.png')} style={{ alignSelf: "flex-end", marginRight: "6%" }} /> */}
                                {/* <Listing onPress={handlePresentModalPress} /> */}
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
