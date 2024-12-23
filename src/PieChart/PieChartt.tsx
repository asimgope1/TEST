import React from 'react';
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { WHITE } from '../constants/color';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const PieChartt = () => {
  // Data for the pie chart
  const data = [
    {
      name: 'Math',
      population: 30,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Science',
      population: 20,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'History',
      population: 25,
      color: '#FABD05',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Language',
      population: 15,
      color: '#00C49F',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Art',
      population: 10,
      color: '#FF8042',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];









  const dataa = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [11,20, 45, 28, 80, 99, 43,200,45],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
    legend: ["Rainy Days"] // optional
  };

  // Get screen width for responsive design
  const screenWidth = Dimensions.get('window').width;
  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 10,
    backgroundGradientTo: "#0810D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
  };

  return (
    <GestureHandlerRootView style={{flex:1}}>
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Subjects Distribution</Text>
      <PieChart
        data={data}
        width={screenWidth} // Chart width
        height={220} // Chart height
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population" // Key for the data values
        backgroundColor="transparent"
        paddingLeft="15"
        absolute // Display actual values in the pie chart
      />
      <LineChart
  data={dataa}
  width={screenWidth}
  height={420}
  chartConfig={chartConfig}
/>

    </View>
    </ScrollView>

    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
  },
});

export default PieChartt;
