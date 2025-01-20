import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import HeaderComp from '../HeaderComp';
import {useNavigation} from '@react-navigation/native';
import {addItem} from '../../../redux/actions/auth';
import {useDispatch} from 'react-redux';

const DescripProduct = ({route}) => {
  const {thumbnail, price, description, category} = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const addToCart = () => {
    const product = {thumbnail, price, category, description};
    dispatch(addItem(product));
    navigation.navigate('SumamryCart');
  };
  const buyNowButton = () => {
    const product = {thumbnail, price, category, description};
    const cartItems = [product]; // Add the current product as the only item in the cart
    const totalPrice = price; // Set the total price to the product price
    dispatch(addItem(product));
    navigation.navigate('SuccessfulBuy', {cartItems, totalPrice});
  };

  return (
    <View style={styles.screen}>
      {/* Header */}
      <HeaderComp title={'Product Details'} />

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={{uri: thumbnail}} style={styles.image} />
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.category}>Category: {category}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyNowButton}
          onPress={buyNowButton}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DescripProduct;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    // flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#555',
    lineHeight: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 20,
    // backgroundColor: '#fff',
    marginBottom:170
  },
  addToCartButton: {
    backgroundColor: '#ff9900',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buyNowButton: {
    backgroundColor: '#e63946',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
