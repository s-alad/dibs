import { Stack, Tabs, router } from 'expo-router';
import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appearance, Platform, TouchableOpacity, useColorScheme, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Login from './(auth)/login';
import { AuthProvider } from '../context/authprovider';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function RootLayout() {


  return (

        <AuthProvider>
          <Stack screenOptions={{ headerShown: true, }}>
            <Stack.Screen
              name="(protected)"
              options={{}}
            />
          </Stack>
        </AuthProvider>

  )
}