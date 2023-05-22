import Barras from "./Grafico/Barras";
import { StyleSheet, ScrollView, View } from "react-native";
import React, {useState, useEffect} from "react";
import Boton from "../../Boton/Boton";

const ruta = '/api/totales/Donostia/';
export default function DonostiaScreen() {
    const [datos, setDatos] = useState([]);
    
    const imageURL = "https://www.eventoplus.com/wp-content/uploads/eventoplus/imgsxml/galerias/destinos/101/org-san-sebastian-bahia-concha491.jpg";
    const ciudad = "Donostia";
    useEffect(() => {
        fetchDatos();

        const interval = setInterval(() => {
            fetchDatos();
        }, 15000);

        return () => clearInterval(interval); 
    }, [ciudad]); 

    const fetchDatos = () => {
        fetch(`http://10.10.18.187:8000${ruta}`)
        .then(response => response.json())
        .then(json => {
            setDatos(json);
            console.log(json);
        })
        .catch(error => {
            console.log(error);
        });
    };

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