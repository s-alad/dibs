import { Stack, Tabs, router } from 'expo-router';
import React from 'react';
import { AuthProvider } from '../context/authprovider';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import "react-native-safe-area-context";
import "react-native-reanimated";
import 'expo-dev-client';
import "expo-router/entry";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
      <Stack screenOptions={{ headerShown: false, }}>
        <Stack.Screen
          name="(protected)"
        />
      </Stack>
    </AuthProvider>
    </GestureHandlerRootView>
  )
}