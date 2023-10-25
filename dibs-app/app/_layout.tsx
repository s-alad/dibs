import { Stack, Tabs, router } from 'expo-router';
import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Appearance, Platform, TouchableOpacity, useColorScheme, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import Login from './login';

export default function RootLayout() {


  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>  
        <Login />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}