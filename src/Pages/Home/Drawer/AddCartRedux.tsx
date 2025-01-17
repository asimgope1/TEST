import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import HeaderComp from '../HeaderComp';
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from '../../../redux/actions/auth';

const users = [
  {
    avatar:
      'https://images.pexels.com/photos/598745/pexels-photo-598745.jpeg?crop=faces&fit=crop&h=200&w=200&auto=compress&cs=tinysrgb',
    price: 'INR 25000',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    price: 'INR 52000',
  },
  {
    avatar:
      'https://images-na.ssl-images-amazon.com/images/M/MV5BMTgxMTc1MTYzM15BMl5BanBnXkFtZTgwNzI5NjMwOTE@._V1_UY256_CR16,0,172,256_AL_.jpg',
    price: 'INR 85000',
  },
];

const AddCartRedux = () => {
  const dispatch = useDispatch();
  // const [addItemCount,setAddItemCount]=useState([])

  const addCart = item => {
    dispatch(addItem(item));
    console.log('jjggjhjghgjgghdvj',item)
  };
  const cartItems  =useSelector(state=>state)
  


  

  const renderItem = ({item}) => (
    <View style={styles.user}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{uri: item.avatar}}
      />
      <View style={styles.info}>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      <TouchableOpacity
  style={styles.addButton}
  onPress={() => {
    addCart(item); // Call the addCart function
    console.log('Item added to cart', item); // Log the added item
  }}
  accessibilityLabel={`Add item with price ${item.price}`}>
  <Text style={styles.addButtonText}>ADD</Text>
</TouchableOpacity>
    </View>
  );

  return (
    // <View style={styles.container}>
    //   <HeaderComp title={'CART'} />
    //   <FlatList
    //     data={users}
    //     keyExtractor={(item, index) => index.toString()}
    //     renderItem={renderItem}
    //     contentContainerStyle={styles.listContainer}
        
    //   />
    // </View>
    <View style={styles.container}>
      <HeaderComp 
      // title={`CART (${cartItems.length})`}
      title={'CART'} 
      />
      <FlatList
        data={users}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default AddCartRedux;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
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
  addButton: {
    backgroundColor: '#197460',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
