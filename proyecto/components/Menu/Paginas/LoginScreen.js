import React from "react";
import { StyleSheet, View } from "react-native";
import Formulario from "../../Formularios/Formulario";

export default function LoginScreen() {
  return (
    <View style={styles.container}>
        <Formulario />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});