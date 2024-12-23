import {View, Text, Image, TouchableOpacity, Alert, PermissionsAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {storeObjByKey} from '../../utils/Storage';
import {useDispatch} from 'react-redux';
import {checkuserToken} from '../../redux/actions/auth';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import Home from '../Home/Home';


const   Login = ({navigation}) => {
  useEffect(()=>{
    requestCameraPermission()
  },[])
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'This app needs Location Permission ' +
            'so you can able to see the location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const  handleLogin = () => {
    const CorrectPassword = '1234';
    if (password === CorrectPassword) {
      const Token = 'Token';
      console.log('Login', Token);
      storeObjByKey('loginResponse', Token);
      dispatch(checkuserToken());
      Alert.alert('Success', 'Login successful!');

    } else {
      console.log('Incorrect Password');
      Alert.alert('Error', 'Incorrect Password. Please try again.');
    }
  };

  return (
    <GestureHandlerRootView>
      <View
        style={{
          flex: 1,
          width: '100%',
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'cyan',
        }}>
        <Image source={require('../../assets/images/logo.png')} />
        <Text style={{fontSize: 18, marginBottom: 10}}>Password</Text>
        
          <TextInput
            placeholder="Enter Your Password"
            secureTextEntry={true}
            placeholderTextColor={'gray'}
            value={password}
            onChangeText={setPassword}
            style={{
              width: '80%',
              borderWidth: 1,
              borderColor: 'gray',
              padding: 10,
              borderRadius: 5,
              marginBottom: 20,
              backgroundColor: 'white',
              color:'black'
            }}
          />
      
        <TouchableOpacity onPress={handleLogin}  style={{
              
              borderWidth: 1,
              borderColor: 'gray',
              padding: 10,
              borderRadius: 5,
              marginBottom: 20,
             
            }}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
};
export default Login