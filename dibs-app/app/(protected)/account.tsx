import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Listing from "../../components/listing";
import { useAuth } from "../../context/authprovider";

export default function Account() {
    let liked = [
        "listigng1",
        "listing2",
        "listing3",
        "listing4"
    ]
    const { setUser } = useAuth();
    function logout() {        
        setUser(null);
    }
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "white", paddingTop: 20} }>
            <TouchableOpacity onPress={logout} style ={{alignSelf:"flex-start", left: 30, top: 20, position: 'absolute', zIndex: 9}}>
                 <Image source={require('dibs-app/assets/exit.png')}  />
            </TouchableOpacity>

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