
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';
import { Icon, Button, Box } from 'native-base';
import React from "react";

import DonostiaScreen from "./Paginas/DonostiaScreen";
import ValenciaScreen from "./Paginas/ValenciaScreen";
import SevillaScreen from "./Paginas/SevillaScreen";
import LoginScreen from "./Paginas/LoginScreen";
import TotalesScreen from "./Paginas/TotalesScreen";
import Encuesta from "../Formularios/Encuesta";
const Drawer = createDrawerNavigator();

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          visibilidad: false,
        };
      }
    
      toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
      };
    
      render() {
        return (
          <NavigationContainer>
            <Drawer.Navigator
              initialRouteName="Home"
              drawerContentOptions={{
                activeTintColor: '#e91e63',
                itemStyle: { marginVertical: 5 },
              }}
              screenOptions={({ navigation, route }) => ({
                headerRight: () =>
                (
                  <Box marginRight={3}>
                    <Button colorScheme="green" _text={{ color: "white", }} onPress={() => navigation.navigate('Iniciar Sesion')}>Login</Button>
                  </Box>
                ),
                headerTitleAlign: 'center',
              })}
            >
              <Drawer.Screen
                name="Donostia"
                component={DonostiaScreen}
                options={{
                  drawerLabelStyle: {
                    fontSize: 20,

                  },
                  drawerItemStyle: {

                  }
                }}
              />
              <Drawer.Screen
                name="Sevilla"
                component={SevillaScreen}
                options={{
                  drawerLabelStyle: {
                    fontSize: 20,

                  },
                  drawerItemStyle: {
                    fontSize: 20,
                  }
                }}
              />
               <Drawer.Screen
                name="Valencia"
                component={ValenciaScreen}
                options={{
                  drawerLabelStyle: {
                    fontSize: 20,

                  },
                  drawerItemStyle: {
                    fontSize: 20,
                  }
                }}
              />
              <Drawer.Screen
                name="Totales"
                component={TotalesScreen}
                options={{
                  drawerLabelStyle: {
                    fontSize: 20,

                  },
                  drawerItemStyle: {
                    fontSize: 20,
                  }
                }}
              />
              <Drawer.Screen
                name="Iniciar Sesion"
                component={LoginScreen}
                options={{
                  drawerLabel: () => '',
                  unmountOnBlur: true,
                  drawerItemStyle: { backgroundColor: 'transparent' }
                }}
              />
              <Drawer.Screen name="Encuesta" component={Encuesta} 
              options={{
                drawerLabel: () => '',
                unmountOnBlur: true,
                drawerItemStyle: { backgroundColor: 'transparent' }
              }}
              />
            </Drawer.Navigator>
          </NavigationContainer>
        );
      }
}