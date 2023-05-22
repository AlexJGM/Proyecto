import Barras from "./Grafico/Barras";
import { StyleSheet, ScrollView, View } from "react-native";
import React, {useState, useEffect} from "react";
import Boton from "../../Boton/Boton";

const ruta = '/api/totales/Sevilla/';
export default function SevillaScreen() {
    const [datos, setDatos] = useState([]);

    const imageURL = "https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/12/20/16715363338279.jpg";
    const ciudad = "Sevilla";
    useEffect(() => {
        fetch(`http://10.10.18.187:8000${ruta}`)
        .then(response => response.json())
        .then(json => {
            setDatos(json);
            console.log(json);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);

    const handlePressEncuesta = (ciudad) => {
        Encuesta.Submit(ciudad);
      };

    return (
        <ScrollView style={styles.container}>
            <Barras data={datos}/>
            <Boton handlePress={() => handlePressEncuesta(ciudad)} imageURL={imageURL} ciudad={ciudad} />
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
      },
  });