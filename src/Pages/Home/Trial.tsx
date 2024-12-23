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
