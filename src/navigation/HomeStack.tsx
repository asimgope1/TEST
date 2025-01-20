import React, {useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Home from '../Pages/Home/Home';
import ProfileScreen from '../Pages/Home/ButtomTab/ProfileScreen';
import Discover from '../Pages/Home/ButtomTab/Discover';
import AddCartRedux from '../Pages/Home/Drawer/AddCartRedux';
import SumamryCart from '../Pages/Home/Drawer/SumamryCart';
import DescripProduct from '../Pages/Home/Drawer/DescripProduct';
import SuccessfulBuy from '../Pages/Home/Drawer/SuccessfulBuy';
import QRSCANNER from '../Pages/Home/Drawer/QRSCANNER';
import CustomDrawer from '../Pages/Home/Drawer/CustomDrawer';
import Box3 from '../Pages/Home/Drawer/Box3';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// StackNavigator for Home and related screens
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen name="AddCartRedux" component={AddCartRedux} options={{headerShown:false}}/>
      <Stack.Screen name="SumamryCart" component={SumamryCart}  options={{headerShown:false}}/>
      <Stack.Screen name="DescripProduct" component={DescripProduct}  options={{headerShown:false}}/>
      <Stack.Screen name="SuccessfulBuy" component={SuccessfulBuy}  options={{headerShown:false}} />
      <Stack.Screen name="Box3" component={Box3}  options={{headerShown:false}} />
      <Stack.Screen name="QRSCANNER" component={QRSCANNER}  />
    </Stack.Navigator>
  );
};

// Bottom Tab Navigator
const TabNavigator = () => {
  const tabBarTranslateY = useRef(new Animated.Value(0)).current;
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const toggleTabBar = () => {
    Animated.timing(tabBarTranslateY, {
      toValue: isTabBarVisible ? 150 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsTabBarVisible(!isTabBarVisible);
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarStyle: {
            ...styles.tabBar,
            transform: [{translateY: tabBarTranslateY}],
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold',
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarIcon: ({focused, color, size}) => {
            if (route.name === 'Home') {
              return (
                <MaterialIcons
                  name="home"
                  size={size || 25}
                  color={color || 'black'}
                />
              );
            } else if (route.name === 'Profile') {
              return (
                <FontAwesome
                  name={focused ? 'user' : 'user-o'}
                  size={size || 25}
                  color={color || 'black'}
                />
              );
            }
          },
        })}>
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen
          name="Discover"
          component={Discover}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({focused}) => (
              <MaterialIcons
                name="manage-search"
                size={50}
                color={focused ? 'tomato' : 'white'}
                style={styles.discoverIcon}
              />
            ),
          }}
        />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>

      <TouchableOpacity style={styles.toggleButton} onPress={toggleTabBar}>
        <Text style={styles.toggleText}>
          {isTabBarVisible ? 'Hide Tab Bar' : 'Show Tab Bar'}
        </Text>
      </TouchableOpacity>
    </>
  );
};

// Drawer Navigator
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
        },
        drawerActiveTintColor: '#004953',
        drawerInactiveTintColor: 'gray',
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={TabNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#004953',
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 10,
    width: '90%',
    marginLeft: 15,
    elevation: 10,
  },
  discoverIcon: {
    position: 'absolute',
    height: 70,
    width: 70,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 2,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#197460',
  },
  toggleButton: {
    position: 'absolute',
    bottom: 150,
    right: 20,
    backgroundColor: '#197460',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    elevation: 5,
  },
  toggleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
