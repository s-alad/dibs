import React from "react";
import { View, Text, StyleSheet} from "react-native";

export default function Listing() {
    return (
        <View style={
            {
                backgroundColor: "lightgrey",
                borderRadius: 20,
                margin: "10%",
                marginBottom: 0.5,
                width: "90%",
                height: "55%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingBottom: 18
            }
        }>
            <View style = {
                {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: 12,
                    height: "12%",
                    width: "90%",
                    display: "flex",
                    
                }
            }>
                <View style = {{
                    flex: 1,
                    justifyContent: 'center',
                    marginLeft: 10,
                }}>
                <Text style={{
                    color:"white"
                }} >Hello</Text>
                </View>
                
            </View>
        </View>
    )
}