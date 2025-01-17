import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Home from './Home'

const HEADERWITHBACK = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: 60,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#004953',
      }}>
      {/* Back Arrow */}
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {navigation.navigate('Home')}}> {/* Navigate to HomeScreen */}
        <MaterialIcons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>

      {/* Header Title */}
      <Text
        style={{
          alignSelf: 'center',
          color: 'white',
          fontWeight: '700',
          fontSize: 18,
          position: 'absolute',
          marginLeft: '40%',
          textAlign: 'center',
        }}>
        {title}
      </Text>
    </View>
  );
};

export default HEADERWITHBACK;

const styles = StyleSheet.create({});
