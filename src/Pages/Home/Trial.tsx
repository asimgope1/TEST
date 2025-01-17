import Geolocation, { GeoPosition, GeoError } from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import BackgroundService, { TaskParams } from 'react-native-background-actions';
import { PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import notifee, { EventType, Notification } from '@notifee/react-native';

// Global flag to control the background task iteration
let isTaskRunning = true;

const sleep = (time: number) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

// Background task to fetch location and show a foreground notification with task icon
const veryIntensiveTask = async (taskDataArguments: TaskParams) => {
  const { delay } = taskDataArguments;
  await new Promise<void>(async (resolve) => {
    while (isTaskRunning && BackgroundService.isRunning()) {
      console.log(`Background task iteration`);
      await fetchLocationAndSendToApi('background');
      await showForegroundPopup();
      await sleep(delay); // Sleep to avoid continuous execution without delay
    }
  });
};

// Request location permission
const requestLocationPermission = async (): Promise<boolean> => {
  try {
    let result;

    if (Platform.OS === 'ios') {
      result = await request(PERMISSIONS.IOS.LOCATION_ALWAYS); // iOS: Requests both foreground and background
    } else if (Platform.OS === 'android') {
      result = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION); // Android: Request foreground permission
    }

    if (result !== RESULTS.GRANTED) {
      console.warn('Foreground location permission not granted');
      return false;
    }

    // Request background location permission for Android 10+ (ACCESS_BACKGROUND_LOCATION)
    if (Platform.OS === 'android') {
      const backgroundPermission = await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION);
      if (backgroundPermission !== RESULTS.GRANTED) {
        console.warn('Background location permission not granted');
        return false;
      }
    }

    console.log('Location permission granted');
    return true;
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

// Fetch location and send it to the API
const fetchLocationAndSendToApi = async (type: 'foreground' | 'background' = 'foreground') => {
  console.log(`Fetching location for ${type} API call...`);

  const permissionGranted = await requestLocationPermission();
  if (!permissionGranted) {
    console.warn('Location permission denied. Cannot fetch location.');
    return;
  }

  Geolocation.getCurrentPosition(
    (position: GeoPosition) => {
      const { latitude, longitude } = position.coords;
      console.log(`Fetched location: Latitude: ${latitude}, Longitude: ${longitude}`);
      sendLocationToApi(latitude, longitude, type);  // Send location to API
    },
    (error: GeoError) => {
      console.error('Error fetching location:', error);
    },
    {
      enableHighAccuracy: true,
    }
  );
};

// Send location to the API
const sendLocationToApi = async (latitude: number, longitude: number, type: 'foreground' | 'background') => {
  try {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const body = JSON.stringify({
      staf_sl: '116',
      log_dt: new Date().toISOString(),
      log_longitude: `${longitude}`,
      log_lattitude: `${latitude}`,
      log_location: 'Bhubaneswar',
      call_type: type, // Include the type to distinguish between foreground and background calls
    });

    const options = {
      method: 'POST',
      headers,
      body,
    };

    const response = await fetch('http://103.180.254.22:8081/adminapi/api/livelocation', options);
    const result = await response.json();
    console.log(`API call result (${type}):`, result);
  } catch (error) {
    console.error(`API call error (${type}):`, error);
  }
};

// Show a foreground notification using Notifee
const showForegroundPopup = async () => {
  await notifee.displayNotification({
    title: 'Location Update',
    body: 'Your location is being updated in the foreground.',
    android: {
      channelId: 'default',
      smallIcon: 'ic_launcher',
      largeIcon: 'ic_launcher',
      ongoing: true, // Persistent notification
    },
  });
};

// Set up background event handler
const setupBackgroundHandler = () => {
  notifee.onBackgroundEvent(async ({ type, detail }: { type: EventType, detail: Notification }) => {
    switch (type) {
      case EventType.PRESS:
        console.log('Notification pressed in the background', detail);
        break;
      default:
        break;
    }
  });
};

// Handle background service crash and restart if necessary
const handleAppCrash = async () => {
  const isServiceRunning = BackgroundService.isRunning();
  if (!isServiceRunning) {
    console.log('Background service stopped unexpectedly. Restarting...');
    try {
      await BackgroundService.start(veryIntensiveTask, {
        taskName: 'Location Service',
        taskTitle: 'Tracking your location',
        taskDesc: 'Running in the background',
        taskIcon: {
          name: 'ic_launcher',
          type: 'mipmap',
          package: 'com.tatapower', // Your app package name
        },
        color: '#ff00ff',
        parameters: { delay: 5000 },
      });
    } catch (error) {
      console.error('Error restarting the background service:', error);
    }
  }
};

// Component
const Trial: React.FC = () => {
  const [isServiceRunning, setIsServiceRunning] = useState<boolean>(false);
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    setupBackgroundHandler();
    handleAppCrash(); // Handle app crash scenario
  }, []);

  const toggleService = async () => {
    try {
      if (!isServiceRunning) {
        const permissionGranted = await requestLocationPermission();
        if (!permissionGranted) {
          Alert.alert('Permission Denied', 'Location permission is required to start the service.');
          return;
        }

        // Start Foreground Service
        const id = Geolocation.watchPosition(
          (position: GeoPosition) => {
            const { latitude, longitude } = position.coords;
            console.log(`Foreground service location: Latitude: ${latitude}, Longitude: ${longitude}`);
            sendLocationToApi(latitude, longitude, 'foreground');
          },
          (error: GeoError) => {
            console.error('Foreground service error fetching location:', error);
          },
          {
            enableHighAccuracy: true,
            distanceFilter: 10,
          }
        );
        setWatchId(id);

        // Start Background Service
        const options = {
          taskName: 'Location Service',
          taskTitle: 'Tracking your location',
          taskDesc: 'Running in the background',
          taskIcon: {
            name: 'ic_launcher',
            type: 'mipmap',
            package: 'com.tatapower', // Your app package name
          },
          color: '#ff00ff',
          parameters: { delay: 5000 },
        };

        await BackgroundService.start(veryIntensiveTask, options);
        isTaskRunning = true; // Set task running flag to true
        setIsServiceRunning(true);
        Alert.alert('Success', 'Service started (Foreground + Background)!');

      } else {
        // Stop Foreground Service
        if (watchId !== null) {
          Geolocation.clearWatch(watchId);
          setWatchId(null);
        }

        // Stop Background Service
        isTaskRunning = false; // Stop the background task
        await BackgroundService.stop();
        setIsServiceRunning(false);
        Alert.alert('Success', 'Service stopped!');
      }
    } catch (error) {
      console.error('Error toggling service:', error);
      Alert.alert('Error', 'Failed to toggle service.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trial Component</Text>
      <TouchableOpacity style={styles.button} onPress={toggleService}>
        <Text style={styles.buttonText}>
          {isServiceRunning ? 'Stop Service' : 'Start Service'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  }, 
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Trial;




// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
// import { useDispatch } from 'react-redux';
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
// import Geolocation from '@react-native-community/geolocation';
// import notifee from '@notifee/react-native';

// const Home = ({ navigation }) => {
//   const [mLat, SetMLat] = useState<number | null>(null);
//   const [mLong, setMLong] = useState<number | null>(null);
//   const [isTracking, setIsTracking] = useState(false); // Track whether location is being tracked
//   const [watchId, setWatchId] = useState(null); // To store the watchId for location tracking
//   const dispatch = useDispatch();

//   // Request location permission function
//   const requestLocationPermission = async () => {
//     try {
//       const result = await request(
//         Platform.OS === 'ios'
//           ? PERMISSIONS.IOS.LOCATION_ALWAYS
//           : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
//       );
//       if (result === RESULTS.GRANTED) {
//         console.log('Location permission granted');
//       } else {
//         console.warn('Location permission not granted');
//       }
//       return result === RESULTS.GRANTED;
//     } catch (error) {
//       console.error('Error requesting location permission:', error);
//       return false;
//     }
//   };

//   // Function to get the current location continuously
//   const startTrackingLocation = async () => {
//     const permissionGranted = await requestLocationPermission();
//     if (!permissionGranted) {
//       console.warn('Location permission denied. Cannot fetch location.');
//       return;
//     }

//     // Use Geolocation.watchPosition for continuous location updates
//     const id = Geolocation.watchPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         console.log(`Tracking location: Latitude: ${latitude}, Longitude: ${longitude}`);
//         SetMLat(latitude);
//         setMLong(longitude);
//       },
//       (error) => {
//         console.error('Error getting location:', error);
//       },
//       {
//         enableHighAccuracy: true, // Always request high accuracy
//         distanceFilter: 0, // Receive updates on every movement
//       }
//     );

//     setWatchId(id); // Store the watchId
//     setIsTracking(true); // Set tracking status to true

//     // Send notification using Notifee when tracking starts
//     await notifee.displayNotification({
//       title: 'Location Tracking Started',
//       body: 'You are now tracking your location.',
//       android: {
//         channelId: 'default',
//         smallIcon: 'ic_launcher', // Add your app's icon for the notification
//       },
//       ios: {
//         sound: 'default',
//       },
//     });
//   };

//   // Function to stop location tracking
//   const stopTrackingLocation = () => {
//     if (watchId) {
//       Geolocation.clearWatch(watchId); // Stop watching the location
//       setIsTracking(false); // Set tracking status to false
//       console.log('Location tracking stopped');
//     }
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         region={{
//           latitude: mLat || 20.3236410,
//           longitude: mLong || 85.8218570,
//           latitudeDelta: 0.015,
//           longitudeDelta: 0.0121,
//         }}
//       >
//         {/* Render Marker only when valid coordinates are available */}
//         {mLat && mLong && (
//           <Marker
//             coordinate={{ latitude: mLat, longitude: mLong }}
//             title={'My Location'}
//             description={'This is where I am currently located'}
//           />
//         )}
//       </MapView>

//       <TouchableOpacity
//         onPress={() => {
//           console.log('Home');
//           navigation.navigate('Trial');
//         }}
//         style={styles.logoutButton}
//       >
//         <Text style={styles.buttonText}>Trial</Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={styles.locationButton}
//         onPress={() => {
//           if (isTracking) {
//             stopTrackingLocation(); // Stop tracking if already started
//           } else {
//             startTrackingLocation(); // Start continuous tracking
//           }
//         }}
//       >
//         <Text style={styles.buttonText}>{isTracking ? 'Stop Tracking' : 'Start Tracking'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   logoutButton: {
//     height: '7%',
//     position: 'absolute',
//     left: '50%',
//     width: '30%',
//     backgroundColor: 'red',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 50,
//   },
//   locationButton: {
//     height: '7%',
//     position: 'absolute',
//     bottom: '10%',
//     width: '30%',
//     backgroundColor: 'green',
//     alignSelf: 'center',
//     justifyContent: 'center',
//     marginHorizontal: 50,
//   },
//   buttonText: {
//     textAlign: 'center',
//     color: 'white',
//   },
// });

// export default Home;