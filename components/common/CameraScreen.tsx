import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {
  CameraView,
  useCameraPermissions,
  type CameraCapturedPicture,
} from 'expo-camera';

export default function CameraScreen() {
  const [facing, setFacing] = useState<'front' | 'back'>('back');

  const [photo, setPhoto] = useState<CameraCapturedPicture | null>(null);

  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef<CameraView | null>(null);

  // Request permission on mount if not already granted
  useEffect(() => {
    if (!permission) requestPermission();
  }, [permission]);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.textCenter}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const flipCamera = () => {
    setFacing((prev) => (prev === 'back' ? 'front' : 'back'));
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const captured = await cameraRef.current.takePictureAsync();
      setPhoto(captured);
      console.log('📸 Captured:', captured.uri);
    }
  };

  const retakePhoto = () => setPhoto(null);

  const usePhoto = () => {
    console.log('✅ Using photo:', photo?.uri);
    // Example: navigate, upload, or pass to another component
  };

  // --- Show preview overlay ---
  if (photo) {
    return (
      <View style={styles.previewContainer}>
        <Image source={{ uri: photo.uri }} style={styles.previewImage} />
        <View style={styles.previewControls}>
          <TouchableOpacity onPress={retakePhoto} style={styles.button}>
            <Text style={styles.text}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={usePhoto} style={styles.button}>
            <Text style={styles.text}>Use Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // --- Default camera view ---
  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1, height: 500 }} facing={facing} ref={cameraRef}>
        <View style={styles.controls}>
          <TouchableOpacity onPress={flipCamera} style={styles.button}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.button}>
            <Text style={styles.text}>Snap</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  controls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    width: 130,
    borderRadius: 6,
    backgroundColor: '#14274e',
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textCenter: {
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    flex: 1,
    height: 600,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  previewImage: {
    flex: 1,
    resizeMode: 'contain',
  },
  previewControls: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
