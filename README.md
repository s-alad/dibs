# dibs

## Information

dibs is a digital flea market for your unused items. It was developed as a project part of BU Spark!'s' innovation lab.  

### code
dibs is written in TS & built on EXPO, React Native, & Firebase.  
*the code is very developmental and is insecure & very messy. all validation is currently done on the client & various bugs exist. This codebase has much to improve on.*

## Development Guide

### Expo
make sure you have the [EAS CLI & Expo](https://docs.expo.dev/) installed.

### Env variables required
EXPO_PUBLIC_FIREBASE_API_KEY  
EXPO_PUBLIC_FIREBASE_APP_ID  
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID  
EXPO_PUBLIC_IOS_CLIENT_ID  
EXPO_PUBLIC_ANDROID_CLIENT_ID  
EXPO_PUBLIC_WEB_CLIENT_ID  

### Builds
make sure you have the development apk (/apks/dibs-dev.apk) or create your own dev apk  

\$ cd dibs-app  
\$ npm i  
\$ npx expo prebuild  
\$ eas build --profile development --platform android  
\> download the apk on phone or emulator

### How To Run

\$ cd dibs-app  
\$ npm i  
\$ npx expo prebuild  
\$ npx expo start --dev-client --tunnel -c  
\> open the dibs app on your phone  
\> scan the QR code or type in the tunnel URL  