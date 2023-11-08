import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import { useAuth } from "../../context/authprovider";
import Listing from "../../components/listing";
export default function Home() {
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
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Home</Text>
            <TouchableOpacity onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
    
                <ScrollView>
                {listings.map((listing) => {
                return(
                    <Listing></Listing>
                )
            })}
                </ScrollView>
        </View>
    );
}