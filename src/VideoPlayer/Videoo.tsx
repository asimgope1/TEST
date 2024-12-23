import React, { useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Video from 'react-native-video';  // Import react-native-video
import Slider from '@react-native-community/slider';

const Videooo = () => {
  const playerRef = useRef(null);
  const [volume, setVolume] = useState(0.1); // Initial volume: 50%

  // Function to increase volume
  const increaseVolume = () => {
    const newVolume = Math.min(volume + 0.1, 1); // Limit max volume to 1
    setVolume(newVolume);
  };

  // Function to decrease volume
  const decreaseVolume = () => {
    const newVolume = Math.max(volume - 0.1, 0); // Limit min volume to 0
    setVolume(newVolume);
  };

  return (
    <View style={styles.container}>
      <Video
        ref={playerRef}
        source={require('../assets/images/Videos/vd.mp4')} // Local video source
        onError={(e) => console.error('Video Player Error:', e)}
        volume={volume} // Control volume directly via the Video component
        controls={true}  // Show default video controls
        resizeMode="cover"
        style={styles.video}
      />

      {/* Volume Controls */}
      <View style={styles.volumeContainer}>
        {/* Decrease Volume Button */}
        <TouchableOpacity onPress={decreaseVolume} style={styles.button}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        {/* Volume Slider */}
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={1}
          value={volume}
          onValueChange={(value) => setVolume(value)}  // Update volume
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1E90FF"
        />

        {/* Increase Volume Button */}
        <TouchableOpacity onPress={increaseVolume} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  video: {
    width: '100%',
    height: 300,  // Adjust video size
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: '80%',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Videooo;
