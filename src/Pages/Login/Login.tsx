import {View, Text, Alert, TouchableOpacity, Image, ImageBackground} from 'react-native';
import React, {useState} from 'react';
import {storeObjByKey} from '../../utils/Storage';
import {useDispatch} from 'react-redux';
import {checkuserToken} from '../../redux/actions/auth';
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const handleLogin = () => {
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
    <GestureHandlerRootView style={{flex: 1}}>
      
      <LinearGradient
        colors={['#BADFE7', '#F6F6F2',
          
        ]}
        style={{flex: 1}}>
        
        <ImageBackground
          source={require('./login.png')} // Replace with your image path
          style={{
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 100,
            backgroundColor:'white',
            borderRadius: 100,
            elevation: 50,
          }}
          imageStyle={{opacity: 0.7}}>
        </ImageBackground>

        <View
          style={{
            padding: 30,
            marginTop: '10%',
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            // elevation: 9,
            // borderRadius: 100,
            // height: '50%',
            // width: '98%',
            // backgroundColor: 'white',
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.2,
            shadowRadius: 4,
          }}>
          
          {/* Grey Gradient Box */}
          {/* <LinearGradient
            colors={['rgb(177, 163, 230)', 'rgb(104, 60, 207)']}
            style={{
              padding: 20,
              borderRadius: 10,
              width: '100%',
              alignItems: 'center',
            }}> */}

            {/* User Name Input */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: 'grey',
                borderWidth: 0.5,
                borderRadius: 5,
                paddingHorizontal: 10,
                marginVertical: 10,
                backgroundColor: 'white',
                width: '100%',
              }}>
              <FontAwesome name="user" size={25} color="#116466" />
              <TextInput
                placeholder="User Name"
                placeholderTextColor="black"
                style={{
                  flex: 1,
                  marginLeft: 10,
                  color: 'black',
                }}
              />
            </View>

            {/* Email Input */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: 'grey',
                borderWidth: 0.5,
                borderRadius: 5,
                paddingHorizontal: 10,
                marginVertical: 10,
                backgroundColor: 'white',
                width: '100%',
              }}>
              <FontAwesome name="user" size={25} color="#116466" />
              <TextInput
                placeholder="Email"
                placeholderTextColor="black"
                style={{
                  flex: 1,
                  marginLeft: 10,
                  color: 'black',
                }}
              />
            </View>

            {/* Password Input */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: 'grey',
                borderWidth: 0.5,
                borderRadius: 5,
                paddingHorizontal: 10,
                marginVertical: 10,
                backgroundColor: 'white',
                width: '100%',
              }}>
              <FontAwesome name="lock" size={25} color="#116466" />
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                placeholderTextColor="black"
                value={password}
                onChangeText={setPassword}
                style={{
                  flex: 1,
                  marginLeft: 10,
                  color: 'black',
                }}
              />
            </View>
          {/* </LinearGradient> */}
        </View>

        {/* Login Button */}
        <TouchableOpacity
          onPress={handleLogin}
          style={{
            // backgroundColor: '#6FB3B8',
            backgroundColor:'#2E5266FF',
            padding: 15,
            borderRadius: 5,
            width: '80%',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 20,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>LOGIN</Text>
        </TouchableOpacity>
      </LinearGradient>
    </GestureHandlerRootView>
  );
};

export default Login;
