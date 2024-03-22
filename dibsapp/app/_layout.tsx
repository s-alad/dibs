import { AuthProvider } from '../context/authprovider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MenuProvider } from 'react-native-popup-menu';
import { SafeAreaView } from "react-native-safe-area-context";

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: '(protected)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
/* SplashScreen.preventAutoHideAsync(); */

export default function RootLayout() {
    const [loaded, error] = useFonts({

    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
        if (error) throw error;
    }, [error]);

    useEffect(() => {
        if (loaded) {
            /* SplashScreen.hideAsync(); */
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return <RootLayoutNav />;
}

function RootLayoutNav() {

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <StatusBar style="dark" />
            <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
                <MenuProvider>
                    <AuthProvider>
                        <Stack
                            screenOptions={{
                                headerShown: false,
                            }}
                        >
                            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
                        </Stack>
                    </AuthProvider>
                </MenuProvider>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}