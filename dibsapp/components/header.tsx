import { View, Text, Image } from "react-native";
import DibsLogo from "../assets/logo.png";

export default function Header() {
    return (
    <View style={{ paddingHorizontal: 12, paddingTop: 12, paddingBottom: 0}}>
        <Image source={DibsLogo} />
        {/* <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", textAlign: "center" }}>Dibs</Text> */}
    </View>
    )
}