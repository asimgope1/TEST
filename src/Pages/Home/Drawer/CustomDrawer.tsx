import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {DrawerItemList} from '@react-navigation/drawer';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Picker} from '@react-native-picker/picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {clearAll} from '../../../utils/Storage';
import {checkuserToken} from '../../../redux/actions/auth';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { BRAND, WHITE } from '../../../constants/color';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const [openDrop, setOpenDrop] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const handleLogout = () => {
    clearAll();
    dispatch(checkuserToken());
    navigation.navigate('Login');
  };
  const handleDrop = () => {
    setOpenDrop(!openDrop);
    setModalVisible(!modalVisible);
  };
  const openModal = () => {
    setModalVisible2(true);
  };

  const closeModal = () => {
    setModalVisible2(false);
  };

  return (
    <GestureHandlerRootView >
        <StatusBar  backgroundColor={'#197460'} barStyle={'light-content'}/>
      <ScrollView style={{
       
            flex: 1,
            backgroundColor: WHITE,
          
      }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <View style={styles.drawerContainer}>
            <View style={styles.drawerHeader}>
              <TouchableOpacity>
                <MaterialIcons name="account-circle" size={70} color="white" />
              </TouchableOpacity>
              <Text style={styles.drawerHeaderText}>Welcome, User</Text>
              <View>
                {/* Dropdown Button */}
                <TouchableOpacity onPress={handleDrop}>
                  <MaterialIcons
                    name={
                      modalVisible
                        ? 'arrow-drop-up'
                        : openDrop
                        ? 'arrow-drop-down'
                        : 'arrow-drop-down'
                    }
                    color="white"
                    size={35}
                    style={{paddingLeft: 10}}
                  />
                </TouchableOpacity>

                {modalVisible && (
                  <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}>
                    <View style={styles.modalOverlay}>
                      <View style={styles.modalContainer}>
                        <Text style={styles.modalText}>Select Language</Text>
                        <Picker
                          selectedValue={selectedLanguage}
                          onValueChange={itemValue =>
                            setSelectedLanguage(itemValue)
                          }
                          style={styles.picker}
                          mode="dropdown">
                          <Picker.Item label="Java" value="java" />
                          <Picker.Item label="JavaScript" value="js" />
                          <Picker.Item label="Python" value="python" />
                          <Picker.Item label="C++" value="cpp" />
                        </Picker>
                        <TouchableOpacity
                          style={styles.closeModalButton}
                          onPress={() => setModalVisible(false)}>
                          <Text style={styles.closeModalText}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </Modal>
                )}
              </View>
            </View>

            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={{flex: 1}}>
              <ScrollView contentContainerStyle={{paddingBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingLeft: 10,
                  }}>
                  <TextInput
                    style={styles.searchBar}
                    placeholder="Search"
                    placeholderTextColor="black"
                    value={searchQuery}
                    onChangeText={text => setSearchQuery(text)}
                  />
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      paddingLeft: 10,
                      marginLeft: 5,
                      backgroundColor: '#197460',
                      height: '60%',
                      width: '15%',
                      alignSelf: 'center',
                      borderRadius: 5,
                    }}>
                    <AntDesign name="search1" size={20} color={'white'} />
                  </TouchableOpacity>
                </View>
                <DrawerItemList {...props} />

                {/* <Image
              source={require('../Pages/Home/courasal_IMG/bg3.jpeg')}
              style={styles.image}
            /> */}
                <View style={styles.fourBoxesContainer}>
                  <TouchableOpacity onPress={openModal}>
                    <View style={{
                        
                    }}>
                      <Text style={{}}>Box 1</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AddCartRedux');
                    }}>
                    <View style={{}}>
                      <Text style={{}}>Box 2</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{}}>
                    <Text style={{}}>Box 3</Text>
                  </View>
                  <View style={{}}>
                    <Text style={{}}>Box 4</Text>
                  </View>
                </View>

                {/* Modal for Four Boxes */}
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={modalVisible2}
                  onRequestClose={closeModal}>
                  <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                      <TouchableOpacity
                        style={styles.closeButton}
                        onPress={closeModal}>
                        <Text style={styles.closeButtonText}>X</Text>
                      </TouchableOpacity>
                      <View style={styles.boxContainer}>
                        <View style={styles.box}>
                          <Text style={styles.boxText}>Box 1</Text>
                        </View>
                        <View style={styles.box}>
                          <Text style={styles.boxText}>Box 2</Text>
                        </View>
                        <View style={styles.box}>
                          <Text style={styles.boxText}>Box 3</Text>
                        </View>
                        <View style={styles.box}>
                          <Text style={styles.boxText}>Box 4</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Modal>

                {/* <AutoSlidingImagesRow /> */}
              </ScrollView>
            </KeyboardAvoidingView>

            <TouchableOpacity
              onPress={handleLogout}
              style={styles.logoutButton}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  logoutButton: {
    backgroundColor: '#EE4E4E',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    marginTop: 100,
  },
  logoutText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
    textAlign: 'center',
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  drawerHeader: {
    height: 110,
    backgroundColor: '#004953',
    // justifyContent: 'center',
    paddingLeft: 10,
    alignItems: 'center',
    // marginBottom: 5,
    flexDirection: 'row',
  },

  drawerHeaderText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingLeft: 5,
    // marginTop: ,
  },
  searchBar: {
    width: '80%',
    height: 50,
    backgroundColor: '#D3D0CBFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginVertical: 10,
    color: 'black',
    // alignItems:'center',
    elevation: 5,
    shadowColor: '#004953',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    // alignContent: 'center',
    alignSelf: 'center',
  },

  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContainer: {
    backgroundColor: 'white',
    width: 300,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    height: 50,
    width: '100%',
  },
  closeModalButton: {
    backgroundColor: '#004953',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  closeModalText: {
    color: 'white',
    fontWeight: 'bold',
  },
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
  carouselRowContainer: {
    marginTop: 20,
    height: 100, // Adjust height as needed
    alignItems: 'center',
  },
  imageRow: {
    width: 150,
    height: 100,
    resizeMode: 'cover',
    marginHorizontal: 5, // Adjust spacing between images
    borderRadius: 8,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  paginationDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#004953',
    marginHorizontal: 5,
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
    
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#004953',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF5A5F',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    width: '90%',
    height: 200,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
  fourBoxesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
});
