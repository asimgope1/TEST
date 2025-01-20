import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import HeaderComp from '../HeaderComp';
import { useDispatch, useSelector } from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { removeItem } from '../../../redux/actions/auth';

const SummaryCart = () => {
  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [serverMessage, setServerMessage] = useState(null);
  const [webSocket, setWebSocket] = useState(null);

  // Setup WebSocket connection
  useEffect(() => {
    // Ensure the port matches the one specified in the server
    const socket = new WebSocket('ws://echo.websocket.org/'); 

    socket.onopen = () => {
      console.log('WebSocket connection established');
      socket.send(
        JSON.stringify({
          type: 'echo',
          payload: 'test',
        })
      );
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Server message received:', message);
      setServerMessage(message);
    };

    socket.onerror = (error) => {
      console.log('WebSocket Error:', error);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWebSocket(socket);

    // Cleanup WebSocket on component unmount
    return () => {
      socket.close();
    };
  }, []);

  const removeItemHandler = (index) => {
    dispatch(removeItem(index));
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Image style={styles.productImage} source={{ uri: item.thumbnail }} />
      <View style={styles.details}>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => removeItemHandler(index)}
        >
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderComp title="Your Cart" />

      {/* Cart Summary */}
      <View style={styles.summaryHeader}>
        <Text style={styles.cartCount}>Cart ({cartItems.length})</Text>
        <TouchableOpacity style={styles.cartIcon}>
          <MaterialIcons name="shopping-cart" size={30} color="#197460" />
          <Text style={styles.cartItemCount}>{cartItems.length}</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items */}
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text>Your cart is empty!</Text>
      )}

      {/* Total Price */}
      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total Price: ₹{totalPrice}</Text>
        </View>
      )}

      {/* {serverMessage && (
        <View style={styles.serverMessageContainer}>
          <Text style={styles.serverMessageText}>Server Message: {JSON.stringify(serverMessage)}</Text>
        </View>
      )} */}

      {/* Checkout Button */}
      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={() =>
            navigation.navigate('SuccessfulBuy', { cartItems, totalPrice })
          }
        >
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SummaryCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 3,
    marginBottom: 10,
  },
  cartCount: {
    fontSize: 20,
    fontWeight: '600',
    color: '#197460',
  },
  cartIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2f1',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  cartItemCount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#197460',
    marginLeft: 5,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 80, // Add padding for the checkout button
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
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  details: {
    flex: 1,
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
  removeButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#f44336',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#197460',
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: '#197460',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  serverMessageContainer: {
    padding: 16,
    backgroundColor: '#fff',
    marginVertical: 10,
  },
  serverMessageText: {
    fontSize: 14,
    color: '#333',
  },
});
