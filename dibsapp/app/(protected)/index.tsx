import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFocusEffect, useRouter } from "expo-router";
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { getFirestore, collection, getDocs, DocumentData, query, orderBy, where } from 'firebase/firestore';
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
        const dibsQuery = query(dibsCollection,
            orderBy('timestamp', 'desc'))
        const dibsSnapshot = await getDocs(dibsQuery);

        let ndibs: Dib[] = [];
        dibsSnapshot.forEach((doc) => {
            const id = doc.id;
            const data: DocumentData = doc.data();

            if (data.reports.length > 2) { return; }

            let newdib = new Dib(data, id);

            //console.log("[FETCH DIBS] Dib - ", newdib);

            ndibs.push(newdib);
        });
        console.log("[FETCH DIBS] Found " + ndibs.length + " dibs");
        console.log("[FETCH DIBS] ------------------------------------ \n"); console.log();
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
    const [reportingDib, setReportingDib] = useState<Dib | null>(null);
    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />, []);

    if (fetchingDibs) {
        return (
            <View style={{ display: "flex", flex: 1, alignItems: "center", backgroundColor: '#000' }}>
                <Header />
                <Loader text="Fetching dibs..." load={true} />
            </View>
        );
    }

    if (dibs.length == 0) {
        return (
            <View style={{ display: "flex", flex: 1, alignItems: "center", backgroundColor: '#000' }}>
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
                    style={{ width: "100%", marginTop: 30 }}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    centerContent={true}
                    removeClippedSubviews={true}
                >
                    {
                        dibs.map((d, i) => (
                            <View style={{ alignItems: "center" }} key={i}>
                                <Listing onPress={() => {
                                    setReportingDib(d);
                                    handlePresentModalPress();
                                }} dib={d} />
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
                    <Text>rep</Text>
                    <Report
                        dib={reportingDib}
                    />
                </BottomSheetModal>
            </View>
        </BottomSheetModalProvider>
    );
}
