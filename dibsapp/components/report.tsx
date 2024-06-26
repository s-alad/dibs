import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, TextInput} from "react-native";
import Divider from './divider';

import { getFirestore, doc, updateDoc, arrayUnion, getDoc, arrayRemove } from 'firebase/firestore';
import { app } from "../services/firebase";

import { useAuthContext } from '../context/authprovider';
import Dib from '../models/dib';

import CheckMark from '../assets/check.png';

interface IReport {
    dib: Dib | null;
}

export default function Report({ dib }: IReport) {

    const db = getFirestore(app);
    const { user } = useAuthContext();

    const [clicked, setClicked] = useState(false);
    const [reported, setReported] = useState(false);
    const [text, onChangeText] = React.useState('Text');
    
    async function click (type: string) {
        if (!user || !dib?.dibId) { return }

        const dibRef = doc(db, 'dibs', dib.dibId);
        const userRef = doc(db, 'users', user.uid);

        let reportType: { [key: string]: string } = {
            "1": "Bullying or harrasment",
            "2": "Scam or fraud",
            "3": "Inappropiate imagery",
            "4": "Sale of illegal or regulated goods",
            "5": "CUSTOM: " + text
        }

        let rep = {
            "type": reportType[type],
            "user": user.uid,
        }

        await updateDoc(dibRef, { reports: arrayUnion(rep) });
        await updateDoc(userRef, { reportedDibs: arrayUnion(dib.dibId) });

        setClicked(true)
    }

    return <View style={styles.report}>

        {!clicked && !reported && <>
            <Text style={styles.header}>Report</Text>
            <Divider />
            <View style={styles.textContainer}>
                <Text style={styles.subHeader}>Why are you reporting this post?</Text>
                <Text style={styles.p}>Your report will remain anonymous.</Text>
            </View>

            <Pressable onPress={() => click("1")} style={styles.button}><Text style={styles.buttonText}>Bullying or harrasment</Text></Pressable>
            <Pressable onPress={() => click("2")} style={styles.button}><Text style={styles.buttonText}>Scam or fraud</Text></Pressable>
            <Pressable onPress={() => click("3")} style={styles.button}><Text style={styles.buttonText}>Inappropiate imagery</Text></Pressable>
            <Pressable onPress={() => click("4")} style={styles.button}><Text style={styles.buttonText}>Sale of illegal or regulated goods</Text></Pressable>
            <Pressable onPress={() => setReported(true)} style={styles.button}><Text style={styles.buttonText}>Something else</Text></Pressable></>
        }

        {clicked && <>
            <Image style={styles.check} source={CheckMark} />
            <Text style={styles.textFinal}>Thanks for letting us know!</Text>
            <Text style={styles.smallfinal}>Your feedback is important in helping us keep the Dibs! community safe.</Text>
        </>}

        {reported && !clicked && <>
            <Text style={styles.header}>Report</Text>
            <Divider />
            <Text style = {{color: "white", margin: 20}}>Help us understand the problem</Text>
            <TextInput style = {styles.textInput} onChangeText={onChangeText} value={text} textAlignVertical="top"/>
            <Pressable onPress = {() => click("5")} style={styles.buttonSubmit}><Text style = {{fontSize: 15, textAlign: "center" }}>Submit</Text></Pressable>
        </>}

    </View>
}
const styles = StyleSheet.create({
    report: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "black",

    },
    header: {
        fontSize: 20,
        marginTop: 15,
        marginBottom: 20,
        color: "white",

    },
    subHeader: {
        color: "white",
        fontWeight: "bold",
        marginTop: 25,
        fontSize: 17,
    },
    p: {
        color: "lightgrey",
        fontSize: 15,

    },
    textContainer: {
        alignSelf: "flex-start",
        display: "flex",
        alignItems: "flex-start",
        marginLeft: 15,
        gap: 10,
        marginBottom: 15
    },
    button: {
        backgroundColor: "white",
        height: 60,
        width: "95%",
        borderRadius: 12,
        margin: 5,
        justifyContent: 'center',
    },
    buttonText: {
        marginLeft: 10,
        fontWeight: "500"
    },
    check: {
        marginTop: 50
    },
    textFinal: {
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        margin: 30
    },
    smallfinal: {
        color: "white",
        marginHorizontal: 25,
        textAlign:"center"
    },
    textInput:{
        width: "90%",
        height: 150,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15
        
    },
    buttonSubmit:{
        backgroundColor:"white",
        height: 40,
        width: "90%",
        borderRadius: 20,
        margin: 5,
        justifyContent: 'center',
        marginTop: 180,
        
    }

})