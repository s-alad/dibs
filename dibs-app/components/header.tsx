import { View, Text, Image } from "react-native";

export default function Header() {
    return (
    <View style={{ paddingHorizontal: 12, paddingTop: 12, paddingBottom: 0}}>
        {/* <Image source={require('dibs-app/assets/logo.png')} /> */}
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Dibs</Text>
    </View>
    )
}