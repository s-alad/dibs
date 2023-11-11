import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useFonts } from 'expo-font';
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authprovider";

import Listing from "../../components/listing";


export default function Home() {
    const [fontsLoaded] = useFonts({
        'Outfit-Regular': require('../../assets/fonts/Outfit-Regular.ttf'),
        'Outfit-Black': require('../../assets/fonts/Outfit-Black.ttf'),
        'Outfit-Light': require('../../assets/fonts/Outfit-Light.ttf'),
        "Outfit-Medium": require("../../assets/fonts/Outfit-Medium.ttf"),
        "Fascinate-Regular": require("../../assets/fonts/Fascinate-Regular.ttf"),
    });

    const { setUser } = useAuth();
    function logout() {        
        setUser(null);
    }


    let listings = [
        "listigng1",
        "listing2",
        "listing3",
        "listing4"
    ]


    return (
        <View style={{ display: "flex", flex: 1, alignItems: "center"}}>

            <View style={{padding: 12}}>
                <Text style={{ fontSize: 18, fontFamily: "Fascinate-Regular",}}>Dibs!</Text>
            </View>

            <ScrollView
                style={{
                    width: "100%",
                    
                }}
                centerContent={true}
            >
                {
                    listings.map((p, i) => (
                        <View style ={{
                            alignItems: "center"
                        }}
                            key={i}
                        >
                        <Listing/>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
    );
}