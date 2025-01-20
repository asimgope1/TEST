import {StyleSheet, Text, TouchableOpacity, View, TextInput} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const Box3 = () => {
  const navigation = useNavigation();
  const route=useRoute()
  const [qrCode,setQrCode]=useState('');
  useEffect(()=>{
    if(route.params?.scannedData)
    {
        setQrCode(route.params.scannedData) // Set the scanned data to the QR code input field
    }
  },[route.params?.scannedData])

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter details to generate QR code"
        placeholderTextColor="#555"
        value={qrCode} // Show the scanned data in the input field
        editable={false}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('QRSCANNER');
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Scan QR</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Box3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  input: {
    flex: 3,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  button: {
    flex: 1,
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
