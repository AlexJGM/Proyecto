import { View, StyleSheet, ScrollView } from "react-native";
import Lineas from "./Grafico/Lineas";
import Tarta from "./Grafico/Tarta";

export default function TotalesScreen() {

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          paddingHorizontal: 5,
          paddingVertical: 3,
        },
      });
    return (
        <ScrollView style={styles.container}>
          <Lineas />
          <Tarta />
        </ScrollView>
    )
}