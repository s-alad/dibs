import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable, ViewStyle } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { Platform, View, Text, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {

    const tabstyling: ViewStyle = {
        backgroundColor: "#000",

        ...Platform.select({
            ios: {
                height: 80,
                paddingBottom: 10,
            },
        }),
    }

    return (
        <Tabs
        initialRouteName="index"
        screenOptions={{
            headerShown: false,
            tabBarStyle: {
                ...tabstyling,
                position: "absolute",
            },
            tabBarActiveTintColor: "#fff",
            tabBarShowLabel: false,
            tabBarHideOnKeyboard: true,
        }}
        >
            <Tabs.Screen
                name="account"
                options={{
                    title: "account",
                    headerShown: false,
                    href: "/account",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="user" color={color} size={22} />
                    ),
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    href: "/",
                    headerShown: false,
                    title: "index",

                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="home" color={color} size={22} />
                    ),
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    title: "camera",
                    headerShown: false,
                    href: "/camera",
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="camera" color={color} size={22} />
                    ),
                }}
            />
        </Tabs>
    );
}

function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
    size?: number;
}) {
    return (
        <View
            style={{
                flexDirection: "column",
                alignItems: "center",
                marginTop: 12,
                backgroundColor: "transparent",
            }}
        >
            <FontAwesome
                size={props.size || 26}
                style={{ marginBottom: 0 }}
                {...props}
            /></View>
    );
}