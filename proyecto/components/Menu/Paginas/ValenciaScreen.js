import Barras from "./Grafico/Barras";
import { StyleSheet, ScrollView, View } from "react-native";
import React, {useState, useEffect} from "react";
import Boton from "../../Boton/Boton";

const ruta = '/api/totales/Valencia/';
export default function ValenciaScreen() {
    const [datos, setDatos] = useState([]);

    const imageURL = "https://www.inspain.org/imgs3/localidades/8/6/1/xfa5ukgvi24oqv5lbq7jtlghwa_2000.jpg";
    const ciudad = "Valencia";

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