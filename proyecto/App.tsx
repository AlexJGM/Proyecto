
import React from 'react';
import { View } from 'react-native';
import { NativeBaseProvider } from "native-base";
import Menu from './components/Menu/Menu';


function App(): JSX.Element {
  return (
    <NativeBaseProvider>  
        <Menu />
    </NativeBaseProvider>
  );
}

export default App;
