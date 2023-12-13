import { ActivityIndicator, View, Text } from "react-native";


interface LoaderProps {
    text?: string;
    load?: boolean;
}

export default function Loader({ text = "Loading", load = true }: LoaderProps ) {
    return <View
			style={{
				flex: 1,
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				gap: 20,
				backgroundColor: "black",
			}}
		>
			<Text style={{ color: "white"}}>{text}</Text>
			{load ? <ActivityIndicator size="large" color="white"/> : ""}
		</View>
}