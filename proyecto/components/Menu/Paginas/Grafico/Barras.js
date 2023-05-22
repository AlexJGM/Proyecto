import React from "react";
import { View, StyleSheet } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

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

  const estilos = StyleSheet.create({
    conten: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    grafico: {
      marginHorizontal: 5,
    }
  });
  
  const screenWidth = Dimensions.get("window").width;
export default function Barras({ data }) {

    return (
        <View>
            <BarChart
                data={{
                    labels: ["sum1", "sum2", "sum3", "sum4", "sum5"],
                    datasets: [
                        {
                            data: [
                                data.sum1,
                                data.sum2,
                                data.sum3,
                                data.sum4,
                                data.sum5,
                            ],
                        },
                    ],
                }}
                width={screenWidth}
                height={300}
                chartConfig={chartConfig}
            />
        </View>
    )
}