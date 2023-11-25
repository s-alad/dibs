import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput } from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { Camera, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera';
import { Feather, Ionicons, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSegments, useRouter, usePathname, useFocusEffect } from "expo-router";

import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

import BottomSheet from '@gorhom/bottom-sheet';

import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { db, auth, app } from "../../services/firebase";

import Loader from "../../components/loader";
import { useAuthContext } from "../../context/authprovider";

import { Buffer } from "buffer";
import Dib from "models/dib";


export default function Snap() {
	const [description, setDescription] = useState<string>("");
	const [showCamera, setShowCamera] = useState<boolean>(false);
	const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
	const [hasLocationPermission, setHasLocationPermission] = useState<boolean | null>(null);
	const [location, setLocation] = useState<Location.LocationObject | null>(null);
	const [locationString, setLocationString] = useState<string | null>(null);
	const [image, setImage] = useState<string | null>(null);
	const [processing, setProcessing] = useState<boolean>(false);
	const [type, setType] = useState(CameraType.back);
	const [flash, setFlash] = useState(FlashMode.off);
	const cameraRef = useRef<Camera | null>(null);
	const bottomSheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["3%", '26%'], []);

	const storage = getStorage(app);
	const db = getFirestore(app);

	const { user } = useAuthContext();
	const router = useRouter();

	useFocusEffect(
		useCallback(() => {
			console.log("[CAM] Focused");
			setShowCamera(true);
			return () => {
				console.log("[CAM] Unfocused");
				setShowCamera(false);
			}
		}, [])
	);

	useEffect(() => {
		(async () => {
			console.log("[CAM] Requesting camera permissions")
			const cameraStatus = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraStatus.status === 'granted');
		})();
	}, []);

	useEffect(() => {
		(async () => {
			console.log("[LOC] Requesting location permissions")
			let { status } = await Location.requestForegroundPermissionsAsync();
			setHasLocationPermission(status === 'granted');
		})();
	}, []);

	function toggleCameraType() { setType(current => (current === CameraType.back ? CameraType.front : CameraType.back)); }
	function toggleFlash() { setFlash(current => (current === FlashMode.off ? FlashMode.torch : FlashMode.off)); }

	async function takePicture() {
		if (cameraRef) {
			try {
				setProcessing(true);
				const photo: CameraCapturedPicture | undefined = await cameraRef.current?.takePictureAsync();
				console.log(photo);
				setProcessing(false);
				if (photo) { setImage(photo.uri); }

			} catch (error) { console.log(error); }
		}
	}

	async function pickImage() {
		try {
			setProcessing(true);
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: false,
				quality: 1,
			});
			setProcessing(false);
			if (!result.canceled) {
				console.log(result.assets[0].uri);
				setImage(result.assets[0].uri);
			}
		} catch (e) { console.log(e); }
		
	}

	async function getLocation() {
		let location = await Location.getCurrentPositionAsync({});
		setLocation(location);
		
		let locationGeo = await Location.reverseGeocodeAsync({ latitude: location.coords.latitude, longitude: location.coords.longitude });
		console.log(locationGeo);
		
		let locationString = `${locationGeo[0].country ?? ""}, ${locationGeo[0].region ?? ""}, ${locationGeo[0].district ?? ""}, ${locationGeo[0].streetNumber ?? ""}, ${locationGeo[0].street ?? ""}, ${locationGeo[0].postalCode ?? ""}`;
		console.log(locationString);
		
		setLocationString(locationString);
	}

	// upload the image, caption, and location to the dibs database
	async function uploadDib() {
		console.log("[UP] Attempt Uploading dib")

		if (!user || !image || !location) { console.log('fail', location, image, user); return; }
		try {
			// Create a reference to the storage bucket
			const storageRef = ref(storage, "dibs/" + user.uid + "/" + Date.now() + ".jpg");

			// create a blob from the local image
			const blob = await fetch(image).then(r => r.blob()).then(blob => { return blob });
			console.log("BLOB", blob)

			// Upload the file
			const snapshot = await uploadBytes(storageRef, blob);
			console.log('Uploaded a blob or file!');

			// Get the download URL for the file
			const downloadURL = await getDownloadURL(storageRef);
			console.log('Download URL:', downloadURL);

			// Now you can store the download URL in Firestore or perform other actions as needed
			const dibsCollection = collection(db, 'dibs');
			const newDib: Dib = {
				creator: {
					uid: user.uid,
					anonymousName: user.anonymousName,
				},
				url: downloadURL,
				description: description,
				likes: [],
				reports: [],
				timestamp: Date.now(),
				location: {
					latitude: location?.coords.latitude,
					longitude: location?.coords.longitude
				}
			}
			const dibDocRef = await addDoc(dibsCollection, newDib);
			console.log("Document written with ID: ", dibDocRef.id);

			// add this document id to the users myDibs array
			const userRef = doc(db, 'users', user.uid);
			await updateDoc(userRef, { myDibs: arrayUnion(dibDocRef.id) });
			console.log("Added dib to user's myDibs array");

			setImage(null);
			setDescription("");
			bottomSheetRef.current?.close();

			router.replace("/home");

		} catch (error) {
			console.error('Error:', error);
		}
	}


	if (hasCameraPermission === false) { return <Loader text="No access to camera" load={false} /> }
	if (hasCameraPermission === null) { return <Loader text="Requesting Camera Permissions" /> }
	if (hasLocationPermission === false) { return <Loader text="No access to location" load={false} /> }
	if (hasLocationPermission === null) { return <Loader text="Requesting Location Permissions" /> }

	if (image) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center", position: "relative" }}>
				<Image source={{ uri: image }} style={{ height: "100%", width: "100%", position: "absolute", zIndex: -1 }} />

				<View style={{ position: "absolute", top: 30, left: 30, zIndex: 99, }} >
					<TouchableOpacity onPress={() => { setImage(null); }}>
						<Ionicons name="close" size={34} color="white" />
					</TouchableOpacity>
				</View>

				<View
					style={{
						position: "absolute",
						height: "100%",
						width: "100%",
						zIndex: 1,
					}}
				>
					<BottomSheet
						ref={bottomSheetRef}
						index={1}
						snapPoints={snapPoints}
						backgroundComponent={({ style }) => (
							<View style={[style, { backgroundColor: "#fff", borderRadius: 12, opacity: 1 }]} />
						)}
						style={{ width: '100%', paddingLeft: 24, paddingRight: 24, display: 'flex', justifyContent: 'center' }}
					>

						<View>
							<Text style={{ color: "#000", textAlign: "left", marginBottom: 10 }}>{locationString}</Text>
						</View>

						<TextInput
							multiline={true}
							numberOfLines={2}
							style={{
								width: "100%",
								backgroundColor: "#E5E5E5",
								borderRadius: 12,
								padding: 10,
								marginBottom: 10,
								borderColor: "#000",
								borderWidth: 1,
								textAlignVertical: "top",
							}}
							placeholder="Enter Caption"
							placeholderTextColor="grey"
							onChangeText={setDescription}
							value={description}
						/>

						<View
							style={{
								height: 40,
								width: "100%",
								backgroundColor: "#000",
								borderRadius: 12,
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<TouchableOpacity onPress={uploadDib}>
								<Text style={{ color: "#fff", textAlign: "center" }}>Upload</Text>
							</TouchableOpacity>
						</View>
					</BottomSheet>
				</View>
			</View>
		);
	}

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			{
				!showCamera ?
					<Loader text="Loading Camera" />
					:
					<Camera
						style={{
							height: "100%",
							width: "100%",
							position: "relative",
							borderRadius: 30,
						}}
						type={type}
						flashMode={flash}
						ref={cameraRef}
						ratio="16:9"
					>

{
						!image && processing ? 
						<View style={{
							position: "absolute", top: 0, left: 0, 
							height: "100%", width: "100%", zIndex: 4, 
							backgroundColor: "rgba(0,0,0,0.5)",
							display: "flex", justifyContent: "center", alignItems: "center",
						}}>
							<ActivityIndicator size="large" color="#fff" />
						</View>
						: ''}

						<View
							style={{
								position: "absolute",
								top: 20,
								right: 20,
								backgroundColor: '#E5E5E5',
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								width: 40,
								paddingVertical: 10,
								borderRadius: 23,
								gap: 20,
							}}
						>
							<TouchableOpacity onPress={toggleCameraType}>
								<MaterialIcons name="flip-camera-android" size={24} color="black" />
							</TouchableOpacity>

							<TouchableOpacity onPress={toggleFlash}>
								<Ionicons name="flash-sharp" size={24} color="black" />
							</TouchableOpacity>
						</View>

						<View
							style={{
								position: "absolute",
								bottom: 40,
								left: '26%',
							}}
						>
							<MaterialCommunityIcons name="image-multiple-outline" size={24} color="white" 
								onPress={() => {
									getLocation();
									pickImage();
								}}
							/>
						</View>

						<View
							style={{
								position: "absolute",
								bottom: 20,
								width: "100%",
								display: "flex",
								alignItems: "center",
							}}
						>
							<Feather name="circle" size={58} color="white" style={{ fontWeight: "700" }}
								onPress={
									() => {
										takePicture();
										getLocation();
									}
								}
							/>
						</View>
					</Camera>
			}
		</View>
	);
}