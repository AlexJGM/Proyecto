import React, { useState } from "react";
import { Image, Flex, Button, ScrollView, HStack, Heading, VStack } from "native-base";
import { Text, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

export default function Encuesta({ route }) {
    const [preguntas, setPreguntas] = useState([]);
    const [subdimensionActual, setSubdimensionActual] = useState(1);
    const [mostrarBotones, setMostrarBotones] = useState(true);
    const [preguntaActual, setPreguntaActual] = useState(0);
    const [elementos, setElementos] = useState([]);
    const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);
    const [respuestas, setRespuestas] = useState({});
    const [mensaje, setMensaje] = useState("");

    const fetchPreguntas = async (subdimension) => {
        try {
            const response = await fetch(
                `http://10.10.18.187:8000/api/preguntas/${subdimension}/`
            );
            const data = await response.json();

            const idPreguntas = data.map((obj) => obj.id_pregunta);

            const elementosPromises = idPreguntas.map((idPregunta) => {
                return fetch(
                    `http://10.10.18.187:8000/api/elementos/${idPregunta}/`
                ).then((response) => response.json());
            });

            const elementosData = await Promise.all(elementosPromises);

            setPreguntas((prevPreguntas) => [...prevPreguntas, ...data]);
            setElementos((prevElementos) => [...prevElementos, ...elementosData]);
        } catch (error) {
            console.log("Error al obtener las preguntas:", error);
        }
    };

    const quest = async (subdimension) => {
        if (subdimension === "c1") {
            await fetchPreguntas("c1");
            await fetchPreguntas("c2");
        } else if (subdimension === "i1") {
            await fetchPreguntas("i1");
            await fetchPreguntas("i2");
        } else if (subdimension === "l1") {
            await fetchPreguntas("l1");
            await fetchPreguntas("l2");
            await fetchPreguntas("l3");
            await fetchPreguntas("l4");
        } else if (subdimension === "p1") {
            await fetchPreguntas("p1");
            await fetchPreguntas("p2");
        } else {
            await fetchPreguntas(subdimension);
        }
        setSubdimensionActual(subdimension);
        setMostrarBotones(false);
        setPreguntaActual(0);
    };

    const Siguiente = () => {
        if (respuestaSeleccionada !== null) {
            const respuestaActual = elementos[preguntaActual].find(
                (elemento) => elemento.elementoId.toString() === respuestaSeleccionada
            );
            setRespuestas((prevRespuestas) => ({
                ...prevRespuestas,
                [preguntas[preguntaActual].id_pregunta]: respuestaActual,
            }));
            setRespuestaSeleccionada(null);
            setMensaje("");

            if (preguntaActual === preguntas.length - 1) {
                setPreguntaActual((prevPregunta) => prevPregunta + 1);
            } else {
                setPreguntaActual((prevPregunta) => prevPregunta + 1);
            }
        } else {
            console.log("Debes seleccionar una opción antes de continuar.");
            setMensaje("Selecciona una opción");
        }
    };

    const Anterior = () => {
        setPreguntaActual((prevPregunta) => prevPregunta - 1);
    };

    const Submit = async () => {
        try {
            for (const preguntaId in respuestas) {
                const respuestaActual = respuestas[preguntaId];
                const year = new Date().getFullYear();
                const { ciudad } = route.params;

                const response = await fetch(
                    "http://10.10.18.187:8000/api/crear_respuesta/create_respuesta/",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: "paco@gmail.com",
                            id_pregunta: preguntaId,
                            ciudad: ciudad,
                            año: year,
                            respuesta: respuestaActual.valor.toString(),
                        }),
                    }
                );

                if (response.ok) {
                    console.log("Respuesta guardada exitosamente");
                } else {
                    console.log("Error al guardar la respuesta:", response.status);
                }

            }
            
            const actu = await fetch("http://10.10.18.187:8000/api/actualizar-respuestas/")
            if (actu.ok) {
                 console.log("Actualizados")
             } else {
                 console.log("Error al actualizar respuestas:", actu.status);
             }

            setPreguntas([]);
            setSubdimensionActual(1);
            setMostrarBotones(true);
            setPreguntaActual(0);
            setElementos([]);
            setRespuestaSeleccionada(null);
            setRespuestas({});
            setMensaje("");
        } catch (error) {
            console.log("Error al realizar la solicitud:", error);
        }
    };

    const styles = StyleSheet.create({
        bullet: {
            fontWeight: 'bold',
            marginHorizontal: 10,
            marginVertical: 10,
            fontSize: 20,
            color: "black",
        },
    });

    return (
        <ScrollView>
            <Flex>
                {mostrarBotones && (
                    <>
                        <Button onPress={() => quest('c1')}>
                            <Image source={{ uri: "https://cdn.pixabay.com/photo/2017/04/14/11/45/letter-c-2229970_1280.png" }} alt="Alternate Text" size="xl" />
                        </Button>
                        <Button onPress={() => quest('e1')}>
                            <Image source={{ uri: "https://p1.pxfuel.com/preview/807/1002/448/letters-abc-alphabet-journal-font.jpg" }} alt="Alternate Text" size="xl" />
                        </Button>
                        <Button onPress={() => quest('i1')}>
                            <Image source={{ uri: "https://cdn.pixabay.com/photo/2016/04/22/17/30/wooden-i-1346177_1280.png" }} alt="Alternate Text" size="xl" />
                        </Button>
                        <Button onPress={() => quest('l1')}>
                            <Image source={{ uri: "https://cdn.pixabay.com/photo/2012/04/14/12/39/alphabets-33749_1280.png" }} alt="Alternate Text" size="xl" />
                        </Button>
                        <Button onPress={() => quest('p1')}>
                            <Image source={{ uri: "https://cdn.pixabay.com/photo/2013/07/14/04/54/alphabet-162585_1280.jpg" }} alt="Alternate Text" size="xl" />
                        </Button>
                        <Button onPress={() => quest('u1')}>
                            <Image source={{ uri: "https://cdn.pixabay.com/photo/2012/04/13/21/23/monogram-33684_1280.png" }} alt="Alternate Text" size="xl" />
                        </Button>
                    </>
                )}

                {preguntas.length > 0 && preguntaActual < preguntas.length && (
                    <>
                        <Text style={{ fontSize: 20 }}>{preguntas[preguntaActual].pregunta}</Text>

                        {elementos[preguntaActual] && elementos[preguntaActual].length > 0 && (
                            <>
                                <RadioButton.Group
                                    value={respuestaSeleccionada}
                                    onValueChange={(value) => setRespuestaSeleccionada(value)}
                                >
                                    {elementos[preguntaActual].map((elemento, index) => (
                                        <RadioButton.Item
                                            key={index}
                                            label={elemento.elemento}
                                            value={elemento.elementoId.toString()}
                                        />
                                    ))}
                                </RadioButton.Group>
                            </>
                        )}
                    </>
                )}
                {preguntas.length > 0 && preguntaActual === preguntas.length && (
                    <VStack space={2.5} w="100%">
                    <Flex justifyContent={"center"} alignItems="center">
                        <Heading>SMR Questionnaire</Heading>
                        <Text style={{color: "black", fontSize: 20}}>In order to answer the following questions use the following scale:</Text>     
                    </Flex>
                    <Flex >
                        <Text style={styles.bullet}>
                            1. The policy or action is still not considered
                        </Text>
                        <Text style={styles.bullet}> 
                            2. A plan to implement the action or policy is being developed but it is in the nearly stage
                        </Text>
                        <Text style={styles.bullet}>
                            3. The policy/action has been underway for some time
                        </Text>
                        <Text style={styles.bullet}>
                            4. The policy/action is monitored to assess the efficiency and impact on the city
                        </Text>
                        <Text style={styles.bullet}>
                            5. The implementation of the policy or action is completely optimized and continuously improved that leads to using the resource efficiently
                        </Text>
                    </Flex>
                    </VStack>
                )}

                <HStack space={2} alignItems="center" justifyContent={"center"}>

                    {preguntaActual > 0 && (
                        <Button onPress={Anterior}>Pregunta anterior</Button>
                    )}

                    {preguntaActual < preguntas.length - 1 && (
                        <Button onPress={Siguiente}>Siguiente pregunta</Button>
                    )}

                    {preguntaActual === preguntas.length - 1 && (
                        <Button onPress={Siguiente}>Siguiente pregunta</Button>
                    )}


                    {preguntas.length > 0 && preguntaActual === preguntas.length && (

                        <Button onPress={Submit}>Submit</Button>
                    )}
                </HStack>

                <Flex alignItems="center">
                    <Text style={{ color: 'red', fontSize: 20 }}>{mensaje}</Text>
                </Flex>
            </Flex>
        </ScrollView>

    );
}
