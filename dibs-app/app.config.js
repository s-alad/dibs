export default {
  "expo": {
    "owner": "dibsapp",
    "name": "dibs-app",
    "slug": "dibs-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "light",
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.dibs.app",
    },
    "android": {
      "package": "com.dibs.app",
      "versionCode": 1,
    },
    "extra": {
      "eas": {
        "projectId": "d7e5a080-bbfd-43e8-ab54-23e9b953346a"
      }
    },
    "plugins": [
      "expo-router",
      [
        "expo-camera", {
          "cameraPermission": "Allow Dibs! to access your camera."
        }
      ],
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow dibs to use your location."
        }
      ]
    ],
    "scheme": "app"
  }
}
