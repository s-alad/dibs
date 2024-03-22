import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { initializeAuth  } from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: "dibswithonei.firebaseapp.com",
    projectId: "dibswithonei",
    storageBucket: "dibswithonei.appspot.com",
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, 
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import * as firebaseAuth from 'firebase/auth';

const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
const auth = initializeAuth(app, {
    persistence: reactNativePersistence(ReactNativeAsyncStorage),
});

export { db, auth, app };

