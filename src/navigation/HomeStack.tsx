import React, {useEffect, useRef, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Login';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../Pages/Home/ButtomTab/ProfileScreen';
import {
  createDrawerNavigator,
  DrawerItemList,
  useDrawerStatus,
} from '@react-navigation/drawer';
import {useDispatch} from 'react-redux';
import {clearAll} from '../utils/Storage';
import {checkuserToken} from '../redux/actions/auth';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import Discover from '../Pages/Home/ButtomTab/Discover';
import AddCartRedux from '../Pages/Home/Drawer/AddCartRedux';
import CustomDrawer from '../Pages/Home/Drawer/CustomDrawer';
import SumamryCart from '../Pages/Home/Drawer/SumamryCart';
import DescripProduct from '../Pages/Home/Drawer/DescripProduct';
import SuccessfulBuy from '../Pages/Home/Drawer/SuccessfulBuy';
import QRSCANNER from '../Pages/Home/Drawer/QRSCANNER';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddCartRedux"
        component={AddCartRedux}
        
      />
      <Stack.Screen
        name="SumamryCart"
        component={SumamryCart}
        
      />
      <Stack.Screen
        name="DescripProduct"
        component={DescripProduct}
        
      />
      <Stack.Screen
        name="SuccessfulBuy"
        component={SuccessfulBuy}
        
      />
      <Stack.Screen
        name="QRSCANNER"
        component={QRSCANNER}
        
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  const tabBarTranslateY = useRef(new Animated.Value(0)).current; // Initially visible
  const [isTabBarVisible, setIsTabBarVisible] = useState(true);

  const toggleTabBar = () => {
    Animated.timing(tabBarTranslateY, {
      toValue: isTabBarVisible ? 150 : 0, // Slide down to 60px or back to 0
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsTabBarVisible(!isTabBarVisible); // Toggle the state
  };

  return (
    <>
      {/* Tab Navigator */}
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
        <Tab.Screen name="Home" component={Home} />
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

      {/* Toggle Button */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleTabBar}>
        <Text style={styles.toggleText}>
          {isTabBarVisible ? 'Hide Tab Bar' : 'Show Tab Bar'}
        </Text>
      </TouchableOpacity>
    </>
  );
};





const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          // backgroundColor: '#004953', // Drawer background color
          // width: 240, // Width of the drawer
        },
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
          // color: 'white', // Text color of drawer items
        },
        drawerActiveTintColor: '#004953', // Color for the active drawer item
        drawerInactiveTintColor: 'gray', // Color for the inactive drawer items
        drawerType: 'slide', // Drawer animation type
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen name="Home" component={TabNavigator}
      options={{
        drawerLabel: () => null 
      }} />
      <Drawer.Screen name="AddCartRedux" component={AddCartRedux}
        options={{
          drawerLabel: () => null 
        }}/>
      <Drawer.Screen name="SumamryCart" component={SumamryCart}
        options={{
          drawerLabel: () => null 
        }}/>
      <Drawer.Screen name="DescripProduct" component={DescripProduct}
        options={{
          drawerLabel: () => null 
        }}/>
      <Drawer.Screen name="SuccessfulBuy" component={SuccessfulBuy}
        options={{
          drawerLabel: () => null 
        }}
        />
      <Drawer.Screen name="QRSCANNER" component={QRSCANNER}
        options={{
          drawerLabel: () => null 

        }}/>
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
    bottom: 150, // Place above the tab bar
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
