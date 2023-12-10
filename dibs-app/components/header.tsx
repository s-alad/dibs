import { View, Text, Image } from "react-native";

export default function Header() {
    return (
            <View style={{ padding: 12,}}>
                <Image source={require('dibs-app/assets/logo.png')} />
            </View>
    )
}