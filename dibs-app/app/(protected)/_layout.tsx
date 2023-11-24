import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View, Text } from "react-native";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProtectedLayout() {
    return (
        <SafeAreaView style={{
            flex: 1,
            height: "100%",
            width: "100%",
        }}>
        <Tabs
            initialRouteName="home"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#000",
                    height: 60,
                    borderRadius: 32,
                    ...Platform.select({
                        ios: {
                            height: 80,
                            paddingBottom: 10,
                        },
                    }),
                },
                tabBarIconStyle: {
                    color: "#fff",
                },
                tabBarActiveTintColor: "#fff",
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="account"
                options={{
                    title: "account",
                    headerShown: false,
                    href: {
                        pathname: "/account",
                    },
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: 12,
                                backgroundColor: "transparent",
                            }}
                        >
                            <TabBarIcon name="user" color={color} size={22} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="home"
                options={{
                    href: "/home",
                    headerShown: false,
                    title: "home",
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: 12,
                                backgroundColor: "transparent",
                            }}
                        >
                            <TabBarIcon name="home" color={color} size={22} />
                        </View>
                    ),
                }}
            />
            <Tabs.Screen
                name="camera"
                options={{
                    headerTitle: "camera",
                    headerShown: false,
                    href: {
                        pathname: "/camera",
                    },
                    tabBarIcon: ({ color }) => (
                        <View
                            style={{
                                flexDirection: "column",
                                alignItems: "center",
                                marginTop: 12,
                                backgroundColor: "transparent",
                            }}
                        >
                            <TabBarIcon name="camera" color={color} size={22} />
                        </View>
                    ),
                }}
            />
        </Tabs>
        </SafeAreaView>
    )
}
function TabBarIcon(props: {
    name: React.ComponentProps<typeof FontAwesome>["name"];
    color: string;
    size?: number;
}) {
    return (
        <FontAwesome
            size={props.size || 26}
            style={{ marginBottom: 0 }}
            {...props}
        />
    );
}