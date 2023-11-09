import { View, Text, Image, ScrollView } from "react-native";
import Listing from "../../components/listing";

export default function Account() {
    let liked = [
        "listigng1",
        "listing2",
        "listing3",
        "listing4"
    ]
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white"} }>
            <Image source={require('dibs-app/assets/exit.png')} style ={{alignSelf:"flex-start", marginLeft:"5%"}} />
            <Image source={require('dibs-app/assets/Ellipse.png')} style = {{width:120, height:120, borderRadius: 200/2}}/>
            <Text style={{fontSize:25, marginBottom: 10}}>User12345</Text>
            <ScrollView
                style={{
                    width: "100%",
                }}
                centerContent={true}
            >
                {
                    liked.map((p, i) => (
                        <View style ={{
                            alignItems: "center"
                        }}>
                        <Image source={require('dibs-app/assets/like.png')} style={{ alignSelf: "flex-end", marginRight: "6%"}}/>
                        <Listing/>
                        </View>
                    ))
                }
            </ScrollView>
           
        </View>
    );
}