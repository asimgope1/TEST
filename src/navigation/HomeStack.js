import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home/Home';
import Trial from '../Pages/Home/Trial';
import Login from '../Pages/Login';

const { Navigator, Screen } = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={Home} />
      <Screen name="Trial" component={Trial} />
      <Screen
        options={{ headerShown: false }}
        name="login"
        component={Login}
      />
      {/* Add other screens here if needed */}
    </Navigator>
  );
};

export default HomeStack;
