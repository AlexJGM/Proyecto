import { LineChart } from "react-native-chart-kit";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Dimensions } from 'react-native';

export default function Lineas() {
  const [datosCiudad, setDatosCiudad] = useState([]);
  const [error, setError] = useState(false);

  const screenWidth = Dimensions.get("window").width;

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

  useEffect(() => {
    fetch(`http://10.10.18.187:8000/api/total-ciudad/`)
      .then(response => response.json())
      .then(json => {
        setDatosCiudad(json);
      })
      .catch(error => {
        console.error(error);
        setError(true);
      });
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error al cargar los datos del gráfico</Text>
      </View>
    );
  }

  if (datosCiudad.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando datos...</Text>
      </View>
    );
  }

  const chartData = {
    labels: datosCiudad.map(ciudad => ciudad.ciudad),
    datasets: [
      {
        data: datosCiudad.map(ciudad => ciudad.percent_complete),
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
        strokeWidth: 2
      }
    ],
  };

  return (
    <View>
      <LineChart
        data={chartData}
        width={screenWidth}
        height={256}
        verticalLabelRotation={30}
        chartConfig={chartConfig}
        bezier
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold"
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  }
});
