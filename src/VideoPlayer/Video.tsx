import { View, Text, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
import VideoPlayer, { type VideoPlayerRef } from 'react-native-video-player';
import { WebView } from 'react-native-webview';



const Video = () => {
    // const playerRef = useRef<VideoPlayerRef>(null);

  return (
    <View style={styles.container}>
    <WebView
      style={styles.video}
      source={{ uri: 'https://www.youtube.com/embed/0AKxFQpNKdo' }}
      allowsFullscreenVideo
    />
  </View>
  )
}

export default Video






const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
});






