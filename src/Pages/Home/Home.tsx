import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import notifee from '@notifee/react-native';

const Home = ({ navigation }) => {
  const [mLat, SetMLat] = useState<number | null>(null);
  const [mLong, setMLong] = useState<number | null>(null);
  const [isTracking, setIsTracking] = useState(false); // Track whether location is being tracked
  const [watchId, setWatchId] = useState(null); // To store the watchId for location tracking
  const dispatch = useDispatch();

  // Request location permission function
  const requestLocationPermission = async () => {
    try {
      const result = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_ALWAYS
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );
      if (result === RESULTS.GRANTED) {
        console.log('Location permission granted');
      } else {
        console.warn('Location permission not granted');
      }
      return result === RESULTS.GRANTED;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  };

  // Function to get the current location continuously
  const startTrackingLocation = async () => {
    const permissionGranted = await requestLocationPermission();
    if (!permissionGranted) {
      console.warn('Location permission denied. Cannot fetch location.');
      return;
    }

    // Use Geolocation.watchPosition for continuous location updates
    const id = Geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Tracking location: Latitude: ${latitude}, Longitude: ${longitude}`);
        SetMLat(latitude);
        setMLong(longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
      },
      {
        enableHighAccuracy: true, // Always request high accuracy
        distanceFilter: 0, // Receive updates on every movement
      }
    );

    setWatchId(id); // Store the watchId
    setIsTracking(true); // Set tracking status to true

    // Send notification using Notifee when tracking starts
    await notifee.displayNotification({
      title: 'Location Tracking Started',
      body: 'You are now tracking your location.',
      android: {
        channelId: 'default',
        smallIcon: 'ic_launcher', // Add your app's icon for the notification
      },
      ios: {
        sound: 'default',
      },
    });
  };

  // Function to stop location tracking
  const stopTrackingLocation = () => {
    if (watchId) {
      Geolocation.clearWatch(watchId); // Stop watching the location
      setIsTracking(false); // Set tracking status to false
      console.log('Location tracking stopped');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: mLat || 20.3236410,
          longitude: mLong || 85.8218570,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {/* Render Marker only when valid coordinates are available */}
        {mLat && mLong && (
          <Marker
            coordinate={{ latitude: mLat, longitude: mLong }}
            title={'My Location'}
            description={'This is where I am currently located'}
          />
        )}
      </MapView>

      <TouchableOpacity
        onPress={() => {
          console.log('Home');
          navigation.navigate('Trial');
        }}
        style={styles.logoutButton}
      >
        <Text style={styles.buttonText}>Trial</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.locationButton}
        onPress={() => {
          if (isTracking) {
            stopTrackingLocation(); // Stop tracking if already started
          } else {
            startTrackingLocation(); // Start continuous tracking
          }
        }}
      >
        <Text style={styles.buttonText}>{isTracking ? 'Stop Tracking' : 'Start Tracking'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  logoutButton: {
    height: '7%',
    position: 'absolute',
    left: '50%',
    width: '30%',
    backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  locationButton: {
    height: '7%',
    position: 'absolute',
    bottom: '10%',
    width: '30%',
    backgroundColor: 'green',
    alignSelf: 'center',
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default Home;
