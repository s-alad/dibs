import { View, Text, TouchableOpacity } from "react-native";
import { Camera, CameraCapturedPicture, CameraType, FlashMode } from 'expo-camera';
import { useCallback, useEffect, useRef, useState } from "react";
import * as MediaLibrary from 'expo-media-library';
import { Feather } from '@expo/vector-icons'; 
import { useFocusEffect } from 'expo-router';

export default function Snap({ navigation } : { navigation: any} ) {
  const [showCamera, setShowCamera] = useState<boolean>(false);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState(CameraType.back);
  const [flaseh, setFlash] = useState(FlashMode.off);
  const cameraRef = useRef<Camera | null>(null);

  useFocusEffect(
    useCallback(() => {
      setShowCamera(true);
      return () => {
        console.log("[CAM] Unfocused");
        setShowCamera(false);
        cameraRef.current?.pausePreview();
      }
    }, [])
  );

  useEffect(() => {
    (async () => {
      console.log("[CAM] Requesting permissions")
      await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function toggleFlash() {
    setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
  }

  async function takePicture() {
    if (cameraRef) {
      try {
        const photo: CameraCapturedPicture | undefined = await cameraRef.current?.takePictureAsync();
        console.log(photo);

        if (photo) {
          setImage(photo.uri);
        }


      } catch (error) {
        console.log(error);
      }
    }
  }

  if (hasCameraPermission === false) {
    return <View>
      <Text>No Access To Camera</Text>
    </View>;
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {showCamera && <Camera 
          style={{
            height: "100%",
            width: "100%",
            position: "relative",
            borderRadius: 30,
          }} 
          type={type}
          flashMode={flaseh}
          ref={cameraRef}
          ratio="16:9"
        >
          <View >
            <TouchableOpacity  onPress={toggleCameraType}>
              <Text >Flip Camera</Text>
            </TouchableOpacity>
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
            <Feather name="circle" size={58} color="white" style={{fontWeight: "700"}}
              onPress={takePicture}
            />
          </View>
        </Camera>}
    </View>
  );
}