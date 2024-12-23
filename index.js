import { AppRegistry, AppState, Platform, Alert } from 'react-native';
import App from './App';
import notifee, { EventType } from '@notifee/react-native';
import { name as appName } from './app.json';
import Geolocation from '@react-native-community/geolocation';

// Main app component registration
AppRegistry.registerComponent(appName, () => App);

// Register the Headless Task for background location tracking
const SomeTaskName = async (data) => {
  console.log('Background location tracking started');

  Geolocation.getCurrentPosition(
    async (position) => {
      console.log('Location received:', position);

      // Example: Send the location to your server
      await fetch('https://your-server.com/location', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          timestamp: position.timestamp,
        }),
      });
    },
    (error) => {
      console.error('Error getting location:', error);
    },
    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
};

AppRegistry.registerHeadlessTask('SomeTaskName', () => SomeTaskName);

// Handle background events with notifee
notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    console.log('Notification "Mark as read" pressed.');

    if (Platform.OS === 'android') {
      Alert.alert('Notification Action', 'You marked this as read!');
    }

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

// Foreground notifications logic
let intervalId;

const sendNotification = async () => {
  await notifee.displayNotification({
    title: 'Reminder',
    body: 'This is your periodic notification!',
    android: {
      channelId: 'default', // Ensure you have created a default channel
      smallIcon: 'ic_launcher', // Add your app's icon for the notification
    },
    ios: {
      sound: 'default',
    },
  });
};

const startForegroundNotifications = () => {
  intervalId = setInterval(() => {
    sendNotification();
  }, 5000); // Trigger every 5 seconds
};

const stopForegroundNotifications = () => {
  clearInterval(intervalId);
};

// Handle app state changes to start/stop foreground notifications
AppState.addEventListener('change', (nextAppState) => {
  if (nextAppState === 'active') {
    startForegroundNotifications();
  } else {
    stopForegroundNotifications();
  }
});
