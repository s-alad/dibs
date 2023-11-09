import 'dotenv/config';

export default {
  "expo": {
    "owner": "dibsapp",
    "name": "dibs-app",
    "slug": "dibs-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.dibs.app",
      "googleServicesFile": "./GoogleService-Info.plist"
    },
    "android": {
      "googleServicesFile": "./google-services.json",
      "package": "com.dibs.app",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
/*     "extra": {
        firebaseApiKey: process.env.FIREBASE_API_KEY,
        firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        firebaseAppId: process.env.FIREBASE_APP_ID
    }, */
    "extra": {
      "eas": {
        "projectId": "d7e5a080-bbfd-43e8-ab54-23e9b953346a"
      }
    },
    "plugins": [
      "expo-router",
      "@react-native-google-signin/google-signin"
    ],
    "scheme": "com.dibs.app"
  }
}