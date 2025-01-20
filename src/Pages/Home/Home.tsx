import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from '@rneui/themed';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import { HEIGHT, WIDTH } from '../../constants/config';
import { BLACK, GRAY, WHITE, BLUE, RED, GREEN } from '../../constants/color';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import HeaderComp from './HeaderComp';



const Home = () => {
  const dispatch = useDispatch();

  const [fromDate, setFromDate] = useState(new Date());
  const [showFromDatePicker, setShowFromDatePicker] = useState(false);
  const [taskDate, setTaskDate] = useState(new Date()); // Separate taskDate for modal
  const [showTaskDatePicker, setShowTaskDatePicker] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [employeeID, setEmployeeID] = useState('');
  const [selectedTask, setSelectedTask] = useState('');
  const [noDataFound, setNoDataFound] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [messages, setMessages] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Initialize WebSocket connection
    const socket = new WebSocket('ws://echo.websocket.org/');

    socket.onopen = () => {
      console.log('WebSocket connection opened');
      setConnected(true);

      // Sending a test message to the server
      // socket.send(JSON.stringify({ type: 'echo', payload: 'Hello, WebSocket!' }));
    };

    socket.onmessage = (event) => {
      console.log('Received message: ', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    socket.onerror = (error) => {
      console.log('WebSocket error: ', error.message);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
      setConnected(false);
    };

    // Cleanup the WebSocket connection on component unmount
    return () => {
      socket.close();
    };
  }, []);
  

  const handleGetButtonPress = () => {
    const selectedDateString = fromDate.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
    const filteredList = tasks.filter(item => item.DATE === selectedDateString);
    setFilteredData(filteredList);
    setNoDataFound(filteredList.length === 0);
  };

  const handleModalSubmit = () => {
    if (employeeID.trim() === '' || selectedTask === '' || !taskDate) {
      Alert.alert('Please select all the fields to submit');
      return;
    }
    const newTask = {
      EMP_ID: employeeID.trim(),
      TASK: selectedTask,
      DATE: taskDate.toISOString().split('T')[0],
    };
    
    // Add new task to the beginning of the tasks array
    setTasks(prevTasks => [newTask, ...prevTasks]);
    
    // Update filteredData immediately to include the new task
    const selectedDateString = fromDate.toISOString().split('T')[0];
    if (newTask.DATE === selectedDateString) {
      setFilteredData(prevFilteredData => [newTask, ...prevFilteredData]);
      setNoDataFound(false); // Ensure no-data message is hidden
    }
  
    setModalVisible(false); // Close modal after submission
    setEmployeeID(''); // Clear inputs
    setSelectedTask('');
    setTaskDate(new Date());
  };
  

  return (
    <GestureHandlerRootView style={styles.container}>
      <HeaderComp title={'HOME'} presslogout={'logout'}/>
      <View style={styles.mainContainer}>
        <View style={styles.rowContainer}>
          {/* Date Picker Container */}
          <TouchableOpacity
            onPress={() => setShowFromDatePicker(true)}
            style={styles.datePickerContainer}>
            <Text style={styles.dateLabel}>Select Date</Text>
            <View style={styles.datePickerContent}>
              <Text style={styles.dateText}>{fromDate.toDateString()}</Text>
              <Icon name="calendar-today" size={HEIGHT * 0.04} color={'#EE4E4E'} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.getButton}
            onPress={handleGetButtonPress}>
            <Text style={styles.getButtonText}>Get</Text>
          </TouchableOpacity>
        </View>

        {showFromDatePicker && (
          <GestureHandlerRootView>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
              <DateTimePicker
                value={fromDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowFromDatePicker(false);
                  if (selectedDate) {
                    setFromDate(selectedDate);
                  }
                }}
              />
            </KeyboardAvoidingView>
          </GestureHandlerRootView>
        )}

        <ScrollView style={{ height: HEIGHT * 0.8 }}>
          <View style={styles.flatListContainer}>
            { noDataFound ? (
              <Text style={styles.emptyText}>No Data Available For The Selected Date!!</Text>
            ) : (
              <FlatList
                data={filteredData.length > 0 ? filteredData : tasks.filter(item => item.DATE === fromDate.toISOString().split('T')[0])}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Text style={styles.cardTitle}>Date: {item.DATE}</Text>
                    <Text style={styles.cardText}>Task: {item.TASK}</Text>
                    <Text style={styles.cardText}>Employee ID: {item.EMP_ID}</Text>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity style={[styles.actionButton, styles.completeButton]}>
                        <Text style={styles.buttonText}>Complete</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.actionButton, styles.transferButton]}>
                        <Text style={styles.buttonText}>Transfer</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.actionButton, styles.rejectButton]}>
                        <Text style={styles.buttonText}>Reject</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                keyExtractor={item => item.EMP_ID.toString()}
              />
            )}
          </View>
        </ScrollView>
      </View>

      {/* Modal for adding new task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Task</Text>

              <TouchableOpacity onPress={() => setShowTaskDatePicker(true)}>
                <Text style={styles.dateLabel}>Select Date</Text>
                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  backgroundColor: WHITE,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: GRAY,
                  padding: 10,
                  shadowColor: BLACK,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.2,
                  shadowRadius: 4,
                  elevation: 5,
                  marginRight: 10,
                }}>
                  <Text style={styles.dateText}>{taskDate.toDateString()}</Text>
                  <Icon name="calendar-today" size={HEIGHT * 0.04} color={BLACK} />
                </View>
              </TouchableOpacity>
              {showTaskDatePicker && (
              <DateTimePicker
                value={taskDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowTaskDatePicker(false);
                  if (selectedDate) {
                    setTaskDate(selectedDate);
                  }
                }}
              />
            )}

              {/* Employee Name Input */}
              <Text style={styles.modalLabel}>Employee ID</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Enter employee name"
                value={employeeID}
                onChangeText={txt => {
                  setEmployeeID(txt);
                }}
              />

              {/* Task Picker */}
              <Text style={styles.pickerLabel}>Task</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedTask}
                  onValueChange={itemValue => setSelectedTask(itemValue)}
                  dropdownIconColor={BLACK}
                  style={{ color: BLACK }}>
                  <Picker.Item
                    label="Select an option"
                    value=""
                    enabled={false}
                  />
                  <Picker.Item label="Task 1" value="task1" />
                  <Picker.Item label="Task 2" value="task2" />
                  <Picker.Item label="Task 3" value="task3" />
                  <Picker.Item label="Task 4" value="task4" />
                </Picker>
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleModalSubmit}>
                  <Text style={styles.buttoText}>Submit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.closeButton]}
                  onPress={() => setModalVisible(false)}>
                  <Text style={styles.buttoText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View>
          <TouchableOpacity
            style={styles.leftCornerButton}
            onPress={() => setModalVisible(true)}>
            <FontAwesome name="plus" size={45} color="#EE4E4E" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D0CBFF',
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 20,
  },
  datePickerContainer: {
    flex: 2,
    backgroundColor: WHITE,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: GRAY,
    padding: 15,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginRight: 10,
  },
  dateLabel: {
    fontSize: 15,
    color: '#EE4E4E',
    marginBottom: 5,
    fontWeight: '500',
  },
  datePickerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    color: BLACK,
    fontSize: 16,
    fontWeight: 'bold',
  },
  getButton: {
    flex: 1,
    backgroundColor: '#197460',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  getButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
  flatListContainer: {
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: GRAY,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: BLACK,
    marginBottom: 5,
  },
  cardText: {
    fontSize: 14,
    color: GRAY,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: GREEN,
  },
  transferButton: {
    backgroundColor: BLUE,
  },
  rejectButton: {
    backgroundColor: RED,
  },
  buttonText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 14,
  },
  leftCornerButton: {
    position: 'absolute', // Make it sticky
    right: 20, // Distance from the right edge
    bottom: 150, // Distance from the bottom edge

    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: BLACK,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 10,
    borderColor: 'black',
    borderWidth: 0.1,
  },
  emptyText: {
    textAlign: 'center',
    color: GRAY,
    fontSize: 16,
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: WIDTH * 0.9,
    padding: 20,
    backgroundColor: WHITE,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalLabel: {
    fontSize: 14,
    color: GRAY,
    marginBottom: 5,
  },
  modalInput: {
    borderColor: GRAY,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  // PickerContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 15,
  // },

  pickerContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    overflow: 'hidden', // Ensures dropdown has rounded edges
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
  },

  selectedTaskText: {
    fontSize: 18,
    color: BLACK,
    fontWeight: 'bold',
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  modalButton: {
    flex: 1, // Makes buttons occupy equal space
    marginHorizontal: 10, // Adds spacing between buttons
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: BLUE, // Use a positive color for submit
  },
  closeButton: {
    backgroundColor: RED, // Use a warning color for close
  },
  buttoText: {
    color: WHITE,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Home;


  /* <TouchableOpacity
              onPress={() => {
                clearAll();
                dispatch(checkuserToken());
              }}
              style={{
                backgroundColor: BLACK,
                padding: 15,
                borderRadius: 10,
                width: '80%',
                alignSelf: 'center',
                marginTop: 20,
              }}>
              <Text style={{ color: WHITE, fontWeight: '700', fontSize: 18 }}>
                Logout
              </Text>
            </TouchableOpacity> */

