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
            
            <Image source={require('dibs-app/assets/Ellipse.png')} style = {{width:120, height:120, borderRadius: 200/2}}/>
            <Text style={{fontSize:25, flex: 1, marginBottom: 50}}>User12345</Text>
            
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
                        <Listing/>
                        </View>
                    ))
                }
            </ScrollView>
           
        </View>
    );
}