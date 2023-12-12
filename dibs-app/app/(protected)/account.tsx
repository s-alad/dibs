import React, { useState, useCallback, useMemo, useRef } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';

import { useFocusEffect } from "expo-router";
import { useAuthContext } from "../../context/authprovider";

import { collection, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { app } from "../../services/firebase";

import Loader from "../../components/loader";
import Listing from "../../components/listing";
import Report from "../../components/report";

import Dib from "../../models/dib";


export default function Account() {
    const { userLogout, user } = useAuthContext();
    const db = getFirestore(app);

    let [fetchingLikedDibs, setFetchingLikedDibs] = useState<boolean>(true);
    let [likedDibs, setLikedDibs] = useState<Dib[]>([]);

    async function getLikedDibs() {
        if (!user) { return }

        try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists() && userDoc.data()?.likedDibs) {
                const likedDibsIds: string[] = userDoc.data().likedDibs;
                console.log("[LIKED] liked dib ids - ", likedDibsIds)

                const dibsCollection = collection(db, 'dibs');
                const likedDibsQuery = query(dibsCollection, where('__name__', 'in', likedDibsIds));
                const likedDibsSnapshot = await getDocs(likedDibsQuery);

                let ndibs: Dib[] = [];
                likedDibsSnapshot.forEach((doc) => {
                    const id = doc.id;
                    const data = doc.data();
                    ndibs.push(new Dib(data, id));
                });
                setLikedDibs(ndibs);
            }
        } catch (e) { console.log("[FETCH LIKED DIBS] Error", e); }
    }

    useFocusEffect(
        useCallback(() => {
            console.log("[FETCH LIKED DIBS] ====================================");
            getLikedDibs().then(() => { setFetchingLikedDibs(false); });

            return () => {
                console.log("[ACCOUNT UNFOCUS] ------------------------------------- \n"); console.log();
                setFetchingLikedDibs(true);
            }
        }, [])
    );

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '75%'], []);
    const renderBackdrop = useCallback((props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} />, []);
    const [reportingDib, setReportingDib] = useState<Dib | null>(null);
    const handlePresentModalPress = useCallback(() => { bottomSheetModalRef.current?.present(); }, []);

    const generateColor = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, '0');
        return `#${randomColor}`;
    };

    const [modalVisible, setModalVisible] = useState(false);
    return (
        <BottomSheetModalProvider>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "black", paddingTop: 20 }}>

                <View style={{ width: "90%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", }}>
                    <TouchableOpacity onPress={userLogout} style={{ alignSelf: "flex-start", top: 0, position: 'absolute', zIndex: 9 }}>
                        <Ionicons name="exit-outline" size={24} color="white" />
                    </TouchableOpacity>

                    <View style={{ width: 120, height: 120, borderRadius: 120 / 2, backgroundColor: generateColor() }} />
                    <Text style={{ fontSize: 25, marginBottom: 70, color: "white", marginTop: 15 }}>{user?.anonymousName}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={{ alignSelf: "flex-end", top: 0, position: 'absolute', zIndex: 9 }}>
                        <Ionicons name="trash" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <Modal
                   animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {

                        setModalVisible(!modalVisible);
                    }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.3)', }}>
                        <View style={{ width: "80%", height: "55%", backgroundColor: 'black' , borderRadius: 30}}>
                            <View style={{margin: 20}}>
                            <TouchableOpacity
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Ionicons name="close" size={24} color="white" />
                            </TouchableOpacity>
                            </View>
                            <View style={{ alignItems:"center"}}>
                                <Ionicons name="trash" size={50} color="white" style={{marginTop:40}}/>
                                <Text style={{color:"white", fontSize: 20, textAlign:"center", margin:30,marginHorizontal:60, fontWeight:"bold"}}>are you sure you would like to delete your account?</Text>
                                <TouchableOpacity>
                                    <Text style={{color: "white", marginTop: 45}}>yes, delete my account</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                {
                    fetchingLikedDibs ? <Loader text="Fetching liked dibs..." load={true} /> :
                    likedDibs.length == 0 ? <Loader text="No liked dibs found." load={false} /> :
                    <>
                        <ScrollView
                            style={{ width: "100%" }}
                            contentContainerStyle={{ paddingBottom: 60 }}
                            centerContent={true}
                        >
                            {
                                likedDibs.map((d, i) => (
                                    <View style={{ alignItems: "center" }} key={i}>
                                        <Listing onPress={ () => {
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
                                backgroundColor: "grey"
                            }}
                            backdropComponent={renderBackdrop}
                        >
                            <Report
                                dib={reportingDib}
                            />
                        </BottomSheetModal>
                    </>
                }
            </View>
        </BottomSheetModalProvider>
    );
}
