import { Tabs } from "expo-router";
import { Platform, View, Text } from "react-native";
import { BottomTabBar } from "@react-navigation/bottom-tabs";

export default function ProtectedLayout() {
    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarStyle:
                    Platform.OS === "ios"
                    && {
                        backgroundColor: "transparent",
                    },
                headerShown: false,
            }}
            tabBar={(props) =>
                Platform.OS === "ios" ? (
                        <BottomTabBar {...props} />

                ) : (
                    <BottomTabBar {...props} />
                )
            }
        >
            <Tabs.Screen
                name="account"
                options={{
                    title: "account",
                    headerShown: true,
                    href: {
                        pathname: "/account",
                    },
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: 17,
                                backgroundColor: "transparent",
                            }}
                        >
                            <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
                                Account
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    href: "/home",
                    headerShown: true,
                    title: "home",
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: 17,
                                backgroundColor: "transparent",
                            }}
                        >
                            <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
                                Home
                            </Text>
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    title: "camera",
                    headerShown: true,
                    href: {
                        pathname: "/camera",
                    },
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: 17,
                                backgroundColor: "transparent",
                            }}
                        >
                            <Text style={{ marginTop: 5, fontSize: 10, opacity: 0.5 }}>
                                Camera
                            </Text>
                        </View>
                    ),
                }}
            />
        </Tabs>
    )
}