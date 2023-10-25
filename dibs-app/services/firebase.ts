// Import the functions you need from the SDKs you need
import Constants from 'expo-constants';

import { initializeApp } from "firebase/app";
import { getAuth, getRedirectResult } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithRedirect } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "dibswithonei.firebaseapp.com",
    projectId: "dibswithonei",
    storageBucket: "dibswithonei.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const gprovider = new GoogleAuthProvider();



export { db, auth, app, gprovider };