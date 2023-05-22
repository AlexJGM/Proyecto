import React from "react";
import { PieChart } from "react-native-chart-kit";
import { View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";


export default function Tarta() {

    const data = [
        {
            name: "Donostia",
            population: 4,
            color: "#F00",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Valencia",
            population: 6,
            color: "purple",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Sevilla",
            population: 5,
            color: "rgb(0, 0, 255)",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        }
    ];

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
        propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
        },
    };

    const screenWidth = Dimensions.get("window").width;

    return (
        <View>
            <PieChart
                data={data}
                width={screenWidth}
                height={250}
                chartConfig={chartConfig}
                accessor={"population"}
                backgroundColor={"white"}
                paddingLeft={"5"}
                center={[6, 0]}
                absolute
            />
        </View>
    )
}