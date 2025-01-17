import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComp from '../HeaderComp';
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from '../../../redux/actions/auth';
import {useNavigation} from '@react-navigation/native';

const AddCartRedux = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const addCart = item => {
    dispatch(addItem(item));
    console.log('jjggjhjghgjgghdvj', item);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('DescripProduct', {
          thumbnail: item.thumbnail,
          price: item.price,
          category: item.category,
          description: item.description,
        });
      }}>
      <View style={styles.user}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{uri: item.thumbnail}}
        />

        <View style={styles.info}>
          <Text style={styles.price}>{item.price} INR</Text>
        </View>
        <View style={styles.info}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#6D6D6D',
            }}>
            {item.category}
          </Text>
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
    </TouchableOpacity>
  );

  const FetchProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      setProducts(data.products);
        console.log('Products', data.products);
    } catch (e) {
      console.log('Error fetching products', e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    FetchProducts();
  }, []);

  return (
    <View style={styles.container}>
      <HeaderComp
        // title={`CART (${cartItems.length})`}
        title={'ITEMS'}
      />
      {loading ? (
        <ActivityIndicator
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          size="large"
          color="#0000ff"
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      )}
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
