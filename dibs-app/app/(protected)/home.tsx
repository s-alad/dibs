import { View, Text, TouchableOpacity, ScrollView,  StyleSheet } from "react-native";
import React, {useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';
import { app } from "../../services/firebase";

import Listing from "../../components/listing";
import Report from "../../components/report";
import Dib from "../../models/dib";

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

    let [dibs, setDibs] = useState<Dib[]>([]);

    const db = getFirestore(app);
    useEffect(() => {
        console.log("====================================");
        (async () => {
            const dibsCollection = collection(db, 'dibs');
            const dibsSnapshot = await getDocs(dibsCollection);

            let ndibs: Dib[] = [];
            dibsSnapshot.forEach((doc) => {
                const data: DocumentData = doc.data();
                ndibs.push(new Dib(data));
            });
            setDibs(ndibs);
            
        })();
    }, []);


    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '75%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    return (
        <BottomSheetModalProvider>
            <View style={{ display: "flex", flex: 1, alignItems: "center" }}>

                <View style={{ padding: 12 }}>
                    <Text style={{ fontSize: 18, fontFamily: "Fascinate-Regular", }}>Dibs!</Text>
                </View>

                <ScrollView
                    style={{ width: "100%" }}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    centerContent={true}
                >
                    {
                        dibs.map((d, i) => (
                            <View style={{ alignItems: "center"}} key={i}>
                                <Listing onPress={handlePresentModalPress} dib={d} />
                            </View>
                        ))
                    }
                </ScrollView>
                
                <BottomSheetModal
                    ref={bottomSheetModalRef}
                    index={1}
                    snapPoints={snapPoints}
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
