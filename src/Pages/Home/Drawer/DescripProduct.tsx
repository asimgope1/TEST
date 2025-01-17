import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HeaderComp from '../HeaderComp';
import { useNavigation } from '@react-navigation/native';
import { addItem } from '../../../redux/actions/auth';
import { useDispatch } from 'react-redux';

const DescripProduct = ({route}) => {
  const {thumbnail, price, description, category} = route.params;
  console.log('object in desc', thumbnail, price, description, category);
  const navigation=useNavigation();
  const dispatch = useDispatch();

  const addToCart=()=>{
    const product = { thumbnail, price, category, description };
    dispatch(addItem(product));
    navigation.navigate('SumamryCart')
  }
  return (
    <>
      <HeaderComp title={'DESCRIPTION'} />
      <View style={styles.container}>
        <Image source={{uri: thumbnail}} style={styles.image} />
        <Text style={styles.price}>Price: {price} INR</Text>
        <Text style={styles.category}>Category: {category}</Text>
        <Text style={styles.description}>Description: {description}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 16,
          marginBottom: 16,
        }}>
        <TouchableOpacity
          style={{backgroundColor: '#ff9900', padding: 10, borderRadius: 5}}
          onPress={()=>{
            addToCart()
          }}
          >
          <Text>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{
            backgroundColor: 'red',
            padding: 10,
            borderRadius: 5,  
        }}>
          <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
          }}
          onPress={()=>{
            navigation.navigate('SuccessfulBuy')
          }}
          >BUY NOW</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default DescripProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  category: {
    fontSize: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});
