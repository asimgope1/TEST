import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import HeaderComp from '../HeaderComp';
import {Formik} from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  phone: Yup.string()
    .required('Phone number is required')
    .matches(
      /^91[0-9]{10}$/,
      'Phone number must start with 91 and be 12 digits long',
    ),
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Name can only contain letters and spaces'),
  email: Yup.string()
    .required('Email is required')
    .email('Enter a valid email')
    .matches(
      /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
      'Email must be a Gmail address (e.g., user@gmail.com)',
    ),
});

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [submittedData, setSubmittedData] = useState({});

  const handleCloseModal = (resetForm) => {
    setModalVisible(false);
    resetForm(); // Clear the form state
  };

  return (
    <View style={styles.container}>
      <HeaderComp title="Profile" presslogout={'default'} />
      <View style={styles.formContainer}>
        <Formik
          initialValues={{name: '', email: '', phone: ''}}
          validationSchema={validationSchema}
          onSubmit={(values, {resetForm}) => {
            setSubmittedData(values);
            setModalVisible(true);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            resetForm,
          }) => (
            <View style={styles.form}>
              <Text style={styles.label}>Name:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholder="Enter Your Name"
                placeholderTextColor="#999"
                value={values.name}
                keyboardType="name-phone-pad"
              />
              {errors.name && touched.name && (
                <Text style={{color: 'red'}}>{errors.name}</Text>
              )}

              <Text style={styles.label}>Email:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                placeholder="Enter Your Email"
                placeholderTextColor="#999"
              />
              {errors.email && touched.email && (
                <Text style={{color: 'red'}}>{errors.email}</Text>
              )}

              <Text style={styles.label}>Phone:</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                keyboardType="number-pad"
                placeholder="Enter Your Phone"
                placeholderTextColor="#999"
              />
              {errors.phone && touched.phone && (
                <Text style={{color: 'red'}}>{errors.phone}</Text>
              )}

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>

              {/* Modal */}
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => handleCloseModal(resetForm)}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Submitted Data</Text>
                    <Text style={styles.modalText}>Name: {submittedData.name}</Text>
                    <Text style={styles.modalText}>Email: {submittedData.email}</Text>
                    <Text style={styles.modalText}>Phone: {submittedData.phone}</Text>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => handleCloseModal(resetForm)}>
                      <Text style={styles.modalButtonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  formContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  form: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#197460',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    alignSelf:"center"
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    alignSelf:"center"

  },
  modalButton: {
    backgroundColor: '#197460',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
