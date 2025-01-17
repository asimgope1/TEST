import { Image, StatusBar, StyleSheet, Text, View,useWindowDimensions } from 'react-native'
import React from 'react'
import Animated,{interpolate, SensorType, useAnimatedSensor, useAnimatedStyle, withTiming} from 'react-native-reanimated'

const IMAGE_OFFSET=250
const PI=Math.PI
const HALF_PI=PI/2
const LayOut1 = () => {
    const { width: screenWidth, height: screenHeight } = useWindowDimensions();
    const sensor=useAnimatedSensor(SensorType.ROTATION,{interval:1000})
    const imageStyle = useAnimatedStyle(()=>{
        const {yaw=0,pitch=0,roll=0}=sensor.sensor.value||{}
        console.log(`${yaw.toFixed(1)}`,`${pitch.toFixed(1)}`,`${roll.toFixed(1)}`)
        
    return {
        top: withTiming (interpolate(pitch, [-HALF_PI, HALF_PI], [-IMAGE_OFFSET *0.5 , 0]),{duration:100}),
        left: withTiming (interpolate(roll, [-PI, PI], [-IMAGE_OFFSET *2,0]),{duration:100}),
      };
    })
  return (
    <View style={styles.container}>
      <Animated.Image source={require('./bg1.jpg')} style={
       [ 
        {height:screenWidth+ 2*IMAGE_OFFSET ,
        width:screenHeight+ 2*IMAGE_OFFSET,
        position: 'absolute'},
        imageStyle
       ]
      }/>
      <StatusBar  backgroundColor={'rgb(175, 3, 255)'}/>
    </View>
  )
}

export default LayOut1

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',overflow: 'hidden'
    }
})

