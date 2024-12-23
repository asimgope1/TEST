import React from 'react';
import { BarChart } from "react-native-gifted-charts";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { Pressable, Text, TouchableOpacity, Vibration, View } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Canvas, Rect, Skia } from '@shopify/react-native-skia';

const PieChartt2 = () => {
  const data = [
    { value: 50 },
    { value: 80 },
    { value: 90 }, 
    { value: 70 },
  ];

  // Shared value for animation
  const animationProgress = useSharedValue(0);

  // Animate progress on mount
  React.useEffect(() => {
    animationProgress.value = withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) });
  }, []);

  // Animated bar height
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scaleY: animationProgress.value }],
  }));
  const vibrateDevice=()=>{
    Vibration.vibrate(100)
  }

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'gray' }}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          {/* Skia Background */}
          {/* <Canvas style={{ height: 200, marginBottom: 20 }}>
            <Rect x={0} y={0} width={200} height={200} color="#f0f0f0" />
          </Canvas> */}
          {/* Animated Bar Chart */}
          <Animated.View style={[animatedStyle]}>
            <BarChart
              data={data}
              backgroundColor="gray"
              barBorderColor="red"
              barBorderRadius={5}
              barWidth={20}
              frontColor="dodgerblue"
              yAxisThickness={1}
              xAxisThickness={1}
            />
          </Animated.View>
          <View>
            <TouchableOpacity style={{height:200,width:200,backgroundColor:'green'}} onLongPress={vibrateDevice}></TouchableOpacity>
            <TouchableOpacity style={{height:200,width:200,backgroundColor:'pink', justifyContent:'flex-end'}} onPress={vibrateDevice}></TouchableOpacity>
            <TouchableOpacity style={{height:200,width:200,backgroundColor:'yellow'}} onPress={vibrateDevice}></TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

export default PieChartt2;
