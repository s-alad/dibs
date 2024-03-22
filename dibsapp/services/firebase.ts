import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { initializeAuth  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
    apiKey: "AIzaSyC5ivUfOVu5lRje0Uxj2KncKuH2jrPJlJ4",
    authDomain: "dibswithonei.firebaseapp.com",
    projectId: "dibswithonei",
    storageBucket: "dibswithonei.appspot.com",
    messagingSenderId: "88888880719", 
    appId: "1:88888880719:web:270ddecd96c5012cdf443a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import * as firebaseAuth from 'firebase/auth';

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
const auth = initializeAuth(app, {
    persistence: reactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth, app };

