import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComp from '../HeaderComp'


const Discover = () => {
  return (
    <View>
    
    </View>
  )
}

export default Discover

const styles = StyleSheet.create({})

// import {Button, StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
// import React from 'react';
// import HeaderComp from '../HeaderComp';
// import {Formik} from 'formik';

// const ProfileScreen = () => {
//   return (
//     <View style={styles.container}>
//       <HeaderComp title="Profile" presslogout={'default'} />
//       <View style={styles.formContainer}>
//         <Formik
//           initialValues={{name: '', email: '', phone: ''}}
//           onSubmit={values => console.log(values)}>
//           {({handleChange, handleBlur, handleSubmit, values}) => (
//             <View style={styles.form}>
//               <Text style={styles.label}>Name</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your name"
//                 placeholderTextColor="#999"
//                 onChangeText={handleChange('name')}
//                 onBlur={handleBlur('name')}
//                 value={values.name}
//               />

//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your email"
//                 placeholderTextColor="#999"
//                 keyboardType="email-address"
//                 onChangeText={handleChange('email')}
//                 onBlur={handleBlur('email')}
//                 value={values.email}
//               />

//               <Text style={styles.label}>Phone</Text>
//               <TextInput
//                 style={styles.input}
//                 placeholder="Enter your phone number"
//                 placeholderTextColor="#999"
//                 keyboardType="phone-pad"
//                 onChangeText={handleChange('phone')}
//                 onBlur={handleBlur('phone')}
//                 value={values.phone}
//               />

//               <TouchableOpacity onPress={handleSubmit} style={styles.button}>
//                 <Text style={styles.buttonText}>Submit</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </Formik>
//       </View>
//     </View>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f4f4f4',
//   },
//   formContainer: {
//     margin: 20,
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 2},
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   form: {
//     marginTop: 10,
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 5,
//     fontWeight: '600',
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     paddingHorizontal: 15,
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 15,
//     backgroundColor: '#f9f9f9',
//   },
//   button: {
//     backgroundColor: '#197460',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });
