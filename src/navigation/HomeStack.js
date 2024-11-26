import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home/Home';

const { Navigator, Screen } = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Navigator initialRouteName="Home">
      <Screen name="Home" component={Home} />
      {/* Add other screens here if needed */}
    </Navigator>
  );
};

export default HomeStack;
