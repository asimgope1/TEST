import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import HeaderComp from '../HeaderComp';

const SuccessfulBuy = ({route}) => {
  // const {cartItems, totalPrice} = route.params;
  const {cartItems = [], totalPrice = 0} = route.params || {}; // Handle undefined params gracefully




  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image style={styles.productImage} source={{uri: item.thumbnail}} />
      <View style={styles.details}>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
    </View>
  );

  return (
    <>
    <HeaderComp title="Successful Purchase" />
    <View style={styles.container}>
      
      <Text style={styles.successText}>Purchase Completed Successfully!</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <Text style={styles.totalText}>Total Amount Paid: ₹{totalPrice}</Text>
    </View>
    </>
  );
};

export default SuccessfulBuy;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#197460',
    textAlign: 'center',
    marginVertical: 20,
  },
  list: {
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    elevation: 2,
  },
  productImage: {
    width: 70,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    // flex: 1,
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productCategory: {
    fontSize: 14,
    color: '#666',
  },
  totalText: {
    marginBottom:300,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#197460',
    textAlign: 'right',
    // marginTop: 20,
  },
});
