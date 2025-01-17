import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import HeaderComp from '../HeaderComp';
import {useDispatch, useSelector} from 'react-redux';
import {Card} from '@rneui/themed';
import {FlatList} from 'react-native-gesture-handler';
import { removeItem } from '../../../redux/actions/auth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native';
import { HEIGHT } from '../../../constants/config';

const SummaryCart = () => {
  const cartItems = useSelector(state => state.cartItems);
  const dispatch = useDispatch();
  const navigation= useNavigation()

  const removeItemHandler = index => {
    dispatch(removeItem(index));
  };

  const renderItem = ({item, index}) => (
    <View style={styles.user}>
      <Image style={styles.image} source={{uri: item.thumbnail}} />
      <View style={styles.info}>
        <Text style={styles.price}>{item.price} INR</Text>
      </View>
      <View style={styles.info}>
        <Text style={{
          fontSize: 14,
          fontWeight: '500',
          color: '#6D6D6D',
        }}>{item.category}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItemHandler(index)}>
        <Text style={styles.removeButtonText}>REMOVE</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderComp title="SummaryCart" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          paddingHorizontal: 10,
        }}>
        <Text style={{
           fontSize: 20,
           fontWeight: '600',
           color: '#004953',
        }}>Cart ({cartItems.length})</Text>
        <TouchableOpacity
          onPress={() => {
            // Navigate to AddCartRedux screen if needed
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          >
          <MaterialIcons name="shopping-cart" size={30} color="black"
           />
          <Text style={{
             fontSize: 18,
             fontWeight: '700',
             color: 'black',
             marginLeft: 5,
             backgroundColor: '#f1f1f1',
             borderRadius: 10,
             paddingHorizontal: 8,
             paddingVertical: 2,
          }}>{cartItems.length}</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}

        
      />
      <View
      style={{
        height:'40%',
            width:'50%',
            justifyContent: 'center',
            alignItems: 'center',
            
            alignSelf:'center',
      }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#004953',
            borderRadius: 5,
            paddingHorizontal: 15,
            paddingVertical: 10,
            // marginTop: 20,
            
            position:'absolute',
            bottom:20,
          }}
          onPress={() => {
navigation.navigate('SuccessfulBuy')          }}
        >
          <Text style={{
            color: 'white',
            fontSize: 18,
            fontWeight: '600',
          }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default SummaryCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
    marginTop: 20,
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    elevation: 2, // For shadow on Android
    shadowColor: '#000', // For shadow on iOS
    shadowOffset: {width: 0, height: 2}, // For shadow on iOS
    shadowOpacity: 0.1, // For shadow on iOS
    shadowRadius: 3, // For shadow on iOS
  },
  removeButton: {
    backgroundColor: '#197460',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
