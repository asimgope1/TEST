import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import { TextInput } from 'react-native';

const QRSCANNER = () => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');
  const [latestScannedData, setLatestScannedData] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true); // Manage camera active state

  useEffect(() => {
    (async () => {
      if (!hasPermission) {
        await requestPermission();
      }
    })();
  }, [hasPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'], // Specify the types of codes to scan
    onCodeScanned: (codes) => {
      if (codes.length > 0) {
        setLatestScannedData(codes[0].value); // Update state with the first scanned code
        console.log(codes[0].value);
        setIsCameraActive(false); // Stop the camera after scanning
      }
    },
  });

  if (device == null) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDeviceText}>No Camera Device Found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        codeScanner={codeScanner}
        device={device}
        isActive={isCameraActive} // Stop the camera once a code is scanned
      />
      {latestScannedData && (
        <View style={styles.resultContainer}>
          <TextInput
            placeholder="Scanned Code"
            value={latestScannedData} // Set the value of TextInput to the scanned data
            style={styles.input}
            editable={false} // Make it non-editable
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4', // Light background for the overall screen
  },
  noDeviceText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 80, // Space it a little higher than the bottom
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent black background
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%', // Adjust width for better appearance
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    color: '#000',
    paddingLeft: 15,
    fontSize: 16,
    borderRadius: 10,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default QRSCANNER;
