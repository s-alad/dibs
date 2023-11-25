import { FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RegisteredStyle, ViewStyle } from "react-native";

export default function ProtectedLayout() {

    const tabstyling: ViewStyle = {
        backgroundColor: "#000",
        height: 64,
        /* borderTopRightRadius: 35,
        borderTopLeftRadius: 35, */
        ...Platform.select({
            ios: {
                height: 80,
                paddingBottom: 10,
            },
        }),
    }

    return (
        <SafeAreaView style={{
            height: "100%",
            width: "100%",
            position: "absolute",
        }}>
            <Tabs
                initialRouteName="home"
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
                    name="home"
                    options={{
                        href: "/home",
                        headerShown: false,
                        title: "home",
                        tabBarStyle: {
                            ...tabstyling,
                            position: "absolute",
                        },
                        tabBarIcon: ({ color }) => (
                            <TabBarIcon name="home" color={color} size={22} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="camera"
                    options={{
                        headerTitle: "camera",
                        headerShown: false,
                        href: "/camera",
                        tabBarStyle: {
                            ...tabstyling,
                            position: "relative",
                        },
                        tabBarIcon: ({ color }) => (
                            <TabBarIcon name="camera" color={color} size={22} />
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