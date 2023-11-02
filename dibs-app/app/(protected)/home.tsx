import { View, Text, TouchableOpacity } from "react-native";

import { useAuth } from "../../context/authprovider";

export default function Home() {
    const { setUser } = useAuth();
    function logout() {
        
        setUser(null);
    }

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Home</Text>
            <TouchableOpacity onPress={logout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}