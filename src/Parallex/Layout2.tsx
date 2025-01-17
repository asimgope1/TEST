import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { BlurView as _BlurView } from "@react-native-community/blur"; // Changed to @react-native-community/blur

import { parallaxLayout } from "./parallax";

import SButton from "@/components/SButton";
import { SlideItem } from "@/components/SlideItem";
import { ElementsText, window } from "@/constants/sizes";
import { CaptureWrapper } from "@/store/CaptureProvider";
import { fruitItems } from "@/utils/items";

const BlurView = Animated.createAnimatedComponent(_BlurView);

const PAGE_WIDTH = window.width / 2;

function Index() {
  return (
    <View
      id="carousel-component"
      dataSet={{ kind: "custom-animations", name: "blur-parallax" }}
    >
      <Carousel
        loop={true}
        style={{
          width: window.width,
          height: 240,
          justifyContent: "center",
          alignItems: "center",
        }}
        width={PAGE_WIDTH}
        data={[...fruitItems, ...fruitItems]}
        renderItem={({ item, index, animationValue }) => {
          return (
            <CustomItem
              key={index}
              index={index}
              animationValue={animationValue}
            />
          );
        }}
        customAnimation={parallaxLayout(
          {
            size: PAGE_WIDTH,
            vertical: false,
          },
          {
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 0.5,
            parallaxScrollingOffset: 40,
          }
        )}
        scrollAnimationDuration={1200}
      />
    </View>
  );
}

interface ItemProps {
  index: number;
  animationValue: Animated.SharedValue<number>;
}

const CustomItem: React.FC<ItemProps> = ({ index, animationValue }) => {
  const maskStyle = useAnimatedStyle(() => {
    const opacity = interpolate(animationValue.value, [-1, 0, 1], [1, 0, 1]);

    return {
      opacity,
    };
  }, [animationValue]);

  return (
    <View
      style={{
        flex: 1,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      }}
    >
      <View style={{ flex: 1, width: "100%" }}>
        <SlideItem index={index} rounded />
      </View>
      <BlurView
        blurAmount={50}
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, maskStyle]}
      />
    </View>
  );
};

export default Index;










import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, { Extrapolation, interpolate, useAnimatedStyle, withTiming } from 'react-native-reanimated';

const { width: screenWidth } = Dimensions.get('window');
const ITEM_WIDTH = screenWidth / 2;  // Width for side images
const CENTER_IMAGE_SCALE = 10;  // Scale for the center image

// Define image sources for the carousel
const Imgs = [
  { uri: require('./courasal_IMG/bg2.jpg') },
  { uri: require('./courasal_IMG/bg3.jpeg') },
  { uri: require('./courasal_IMG/bg4.jpeg') },
  { uri: require('./courasal_IMG/bg5.jpeg') },
  { uri: require('./courasal_IMG/bg6.jpeg') },
  { uri: require('./courasal_IMG/bg7.jpeg') },
  { uri: require('./courasal_IMG/bg8.jpg') },
];

const Home = () => {
  const [entries, setEntries] = useState(Imgs);
  const carouselRef = useRef(null);

  useEffect(() => {
    setEntries(Imgs); // Set the initial entries for the carousel
  }, []);

  // Function to render each carousel item with the parallax effect
  const renderItem = ({ item, index, animationValue }) => {
    const animatedStyle = useAnimatedStyle(() => {
      // Scale effect for center image, side images will be smaller
      const scale = interpolate(animationValue.value, [-1, 0, 1], [0.8, 1, CENTER_IMAGE_SCALE], Extrapolation.CLAMP);
      
      // Opacity effect for blurred side images
      const opacity = interpolate(animationValue.value, [-1, 0, 1], [0.5, 1, 1], Extrapolation.CLAMP);
      
      // Sliding effect for images (side images move out, center image stays centered)
      const translateX = interpolate(animationValue.value, [-1, 0, 1], [-ITEM_WIDTH, 0, ITEM_WIDTH], Extrapolation.CLAMP);

      return {
        transform: [{ scale }, { translateX }],
        opacity: withTiming(opacity, { duration: 300 }),
      };
    }, [animationValue]);

    return (
      <View style={styles.imageWrapper}>
        <Image source={item.uri} style={styles.imageContainer} />
        
        {/* Apply blur effect to side images */}
        {index !== 1 && (
          <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
            <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: 'black', opacity: 0.3 }]} />
          </Animated.View>
        )}
        
        {/* Text overlay */}
        <Text style={styles.textOverlay}>Image {index + 1}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={carouselRef}
        loop
        width={screenWidth}  // Total width of the carousel
        height={screenWidth / 2}  // Height of each image
        autoPlay={true}  // Enable auto play
        data={entries}
        renderItem={renderItem}
        scrollAnimationDuration={1000}  // Duration of transition
        onSnapToItem={(index) => console.log('Current index:', index)}
        customAnimation={(value) => {
          "worklet";
          const translateX = interpolate(value, [-1, 0, 1], [-ITEM_WIDTH, 0, ITEM_WIDTH], Extrapolation.CLAMP);
          return {
            transform: [{ translateX }],
          };
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
  imageWrapper: {
    width: ITEM_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  textOverlay: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    color: 'white',
    fontSize: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});

export default Home;

