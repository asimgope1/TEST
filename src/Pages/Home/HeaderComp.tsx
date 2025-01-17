import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { addItem } from '../../redux/actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const HeaderComp = ({title}) => {
  const navigation = useNavigation();
  const route = useRoute();


  // Check if the current screen is Home, AddCartRedux or SumamryCart
  const isHomeScreen = route.name === 'Home';
  const isCartScreen = route.name === 'AddCartRedux';
  const isSummaryScreen = route.name === 'SumamryCart';
  const isDescriptionScreen = route.name === 'DescripProduct'
  const isSuccessfullBuyScreen = route.name === 'SuccessfulBuy'
  // const dispatch = useDispatch();
  // const [addItemCount,setAddItemCount]=useState([])

  const cartItems = useSelector(state => state.cartItems);


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
      {/* Conditional Icon */}
      <TouchableOpacity
        style={{
          height: 50,
          width: 50,
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          if (isHomeScreen) {
            navigation.toggleDrawer();
          } else if (isSummaryScreen) {
            navigation.navigate('AddCartRedux');
          } else if (isCartScreen) {
            navigation.navigate('Home');
          }else if(isDescriptionScreen){
            navigation.navigate('AddCartRedux');
          }else if(isSuccessfullBuyScreen){
            navigation.navigate('AddCartRedux')
          }
           else {
            navigation.goBack();
          }
        }}>
        {isHomeScreen ? (
          <Octicons name="three-bars" size={24} color="white" />
        ) : (
          <MaterialIcons name="arrow-back" size={30} color="white" />
        )}
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

      {isCartScreen && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SumamryCart'); // Navigate to SumamryCart screen
          }}
          style={{
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'row'
          }}>
          <MaterialIcons name="shopping-cart" size={30} color="white" />{' '}
          <Text style={{
            color: 'white',
            marginLeft: 5,
            fontWeight: '700',
            fontSize: 18,
            textAlign: 'center',
            backgroundColor: '#004953',
            borderRadius: 10,
            paddingHorizontal: 5,
            paddingVertical: 2,
          }}>{cartItems.length > 0 ? cartItems.length : 0}</Text>
          {/* Cart icon */}
        </TouchableOpacity>
      )}
      {isSummaryScreen &&(
        <TouchableOpacity
          // onPress={() => {
          //   navigation.navigate('AddCartRedux'); // Navigate to AddCartRedux screen
          // }}
          style={{
            height: 50,
            width: 50,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection:'row'
          }}>
          <MaterialIcons name="shopping-cart" size={30} color="white" />{' '}
          <Text style={{
            color: 'white',
            marginLeft: 5,
            fontWeight: '700',
            fontSize: 18,
            textAlign: 'center',
            backgroundColor: '#004953',
            borderRadius: 10,
            paddingHorizontal: 5,
            paddingVertical: 2,
          }}>{cartItems.length > 0? cartItems.length : 0}</Text>
          {/* Cart icon */}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default HeaderComp;
