import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';

import { getFirestore, collection, getDocs, DocumentData } from 'firebase/firestore';
import { app } from "../../services/firebase";

import Listing from "../../components/listing";
import Report from "../../components/report";
import Dib from "../../models/dib";
import Loader from "../../components/loader";
import Header from "../../components/header";

export default function Home() {
    const db = getFirestore(app);

    let [fetchingDibs, setFetchingDibs] = useState<boolean>(true);
    let [dibs, setDibs] = useState<Dib[]>([]);
    async function getDibs() {
        const dibsCollection = collection(db, 'dibs');
        const dibsSnapshot = await getDocs(dibsCollection);

        let ndibs: Dib[] = [];
        dibsSnapshot.forEach((doc) => {
            const id = doc.id;
            const data: DocumentData = doc.data();
            ndibs.push(new Dib(data, id));
        });
        console.log("[FETCH DIBS] Found " + ndibs.length + " dibs");
        setDibs(ndibs);
    }

    useFocusEffect(
        useCallback(() => {
            console.log("[FETCH DIBS] ====================================");
            getDibs().then(() => { setFetchingDibs(false); });

            return () => {
                console.log("[HOME UNFOCUS] ------------------------------------ \n"); console.log();
                setFetchingDibs(true);
            }
        }, [])
    );

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '75%'], []);
    const handlePresentModalPress = useCallback(() => { bottomSheetModalRef.current?.present(); }, []);
    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />, []);

    if (fetchingDibs) {
        return (
            <View style={{ display: "flex", flex: 1, alignItems: "center" }}>
                <Header />
                <Loader text="Fetching dibs..." load={true} />
            </View>
        );
    }

    if (dibs.length == 0) {
        return (
            <View style={{ display: "flex", flex: 1, alignItems: "center" }}>
                <Header />
                <Loader text="No dibs found." load={false} />
            </View>
        );
    }

    return (
        <BottomSheetModalProvider>
            <View style={{ display: "flex", flex: 1, alignItems: "center", backgroundColor: "black" }}>

                <Header />

                <ScrollView
                    style={{width:"100%", marginTop: 30 }}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    centerContent={true}
                >
                    {
                        dibs.map((d, i) => (
                            <View style={{ alignItems: "center" , marginBottom: 15}} key={i}>
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
                    handleIndicatorStyle={{
                        backgroundColor: "white"
                    }}
                    backdropComponent={renderBackdrop}
                >
                    <Report />
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
}
