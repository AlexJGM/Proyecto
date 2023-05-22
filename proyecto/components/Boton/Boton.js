import React from "react";
import { Button, Flex, Box, HStack,AspectRatio, Image, Center, Stack, Heading, Text } from "native-base";
import Encuesta from "../Formularios/Encuesta";
import { useNavigation } from '@react-navigation/native';

const Example = ({imageURL, ciudad}) => {
  const navigation = useNavigation();
  const handlePress = (ciudad) => {
    navigation.navigate('Encuesta', { ciudad: ciudad });
  };
    return <Box alignItems="center" >
            <Box maxW="90%" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="2" _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700"
      }} _web={{
        shadow: 2,
        borderWidth: 0
      }} _light={{
        backgroundColor: "gray.50"
      }}>
          <Box>
            <AspectRatio w="100%" ratio={16 / 9}>
              <Image source={{
                uri: imageURL
            }} alt="image" />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                    {ciudad}
              </Heading>
              <Text fontSize="xs" _light={{
              color: "violet.500"
            }} _dark={{
              color: "violet.400"
            }} fontWeight="500" ml="-0.5" mt="-1">
                    Encuesta
              </Text>
            </Stack>
            <Text fontWeight="400">
              Esta encuesta es referencial por la ciudad del usuario, porfavor no permita
              que la opinion de usuarios de otras ciudades interfieran en el resultado.
            </Text>
            <Flex>
            <Button size={"lg"} onPress={() => handlePress(ciudad)}>Encuesta</Button>
            </Flex> 
          </Stack>
        </Box>
        
      </Box>;
  };
class Boton extends React.Component {

    render() {
        return(
            <Example imageURL={this.props.imageURL} ciudad={this.props.ciudad} />
        )
    }
}

export default Boton;