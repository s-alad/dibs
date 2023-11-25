import { Stack, Tabs, router } from 'expo-router';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Appearance, Platform, TouchableOpacity, useColorScheme, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from '../context/authprovider';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
      'Outfit-Regular': require('../assets/fonts/Outfit-Regular.ttf'),
      'Outfit-Black': require('../assets/fonts/Outfit-Black.ttf'),
      'Outfit-Light': require('../assets/fonts/Outfit-Light.ttf'),
      "Outfit-Medium": require("../assets/fonts/Outfit-Medium.ttf"),
      "Fascinate-Regular": require("../assets/fonts/Fascinate-Regular.ttf"),
  });

  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false, }}>
        <Stack.Screen
          name="(protected)"
        />
      </Stack>
    </AuthProvider>
  )
}