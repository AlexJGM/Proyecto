import React, { useState } from 'react';
import { VStack, Input, Button, Center, Stack, FormControl, View, HStack } from 'native-base';

function Formularios() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
      const [showRegisterForm, Mostrar] = useState(true);


      const [errors, setErrors] = useState({});

    const validate = () => {
        if (formData.name === undefined) {
            setErrors({
                ...errors,
                name: 'Name is required'
            });
            return false;
        } else if (formData.name.length < 3) {
            setErrors({
                ...errors,
                name: 'Name is too short'
            });
            return false;
        } if (formData.email === undefined) {
            setErrors({
                ...errors,
                email: 'email is required'
            });
            return false;
        } else if (!formData.email.includes('@')) {
            setErrors({
                ...errors,
                email: '@ is required'
            });
            return false;
        } if (formData.password === undefined) {
            setErrors({
                ...errors,
                password: 'Password is required'
            });
        } else if (formData.password.length < 6) {
            setErrors({
                ...errors,
                password: 'Password ir too short'
            });
        }
        return true;
    }

    const onSubmit = async () => {
        validate() ? console.log('Submitted') : console.log('Validation Failed');
        try {
          const response = await fetch('http://10.63.142.209:8000/api/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          console.log(data); // Maneja la respuesta de tu API
        } catch (error) {
          console.error(error);
          const data = await error.json();
          setErrors(data.errors); // Maneja los errores de tu API
        }
      };

      const Login = async () => {
        validate() ? console.log('Submitted') : console.log('Validation Failed');
        try {
          const response = await fetch('http://10.63.142.209:8000/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          console.log(data); // Maneja la respuesta de tu API
        } catch (error) {
          console.error(error);
          const data = await error.json();
          setErrors(data.errors); // Maneja los errores de tu API
        }
      };
      

    return  <VStack width="100%" mx="5" maxW="600px" height="100%" maxH="700px">
    <HStack space={2}>
      <Button size={"lg"} variant="outline"onPress={() => Mostrar(true)}>Login</Button>
      <Button size={"lg"} variant="outline" onPress={() => Mostrar(false)}>Register</Button>
    </HStack>     
    {showRegisterForm ? (
    <View>
    <FormControl>
      <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
      <Input
        placeholder="email"
        onChangeText={(value) => setFormData({ ...formData, email: value })}
        keyboardType="email-address"
      />

      <FormControl.Label _text={{ bold: true }}>Password</FormControl.Label>
      <Input
        placeholder="password"
        onChangeText={(value) => setFormData({ ...formData, password: value })}
        secureTextEntry
      />
  </FormControl>

    <Button onPress={Login} mt="5" colorScheme="indigo">
      Login
    </Button>
    </View>
      ) : (
    <View>   
    <FormControl>
      <FormControl.Label _text={{ bold: true }}>Name</FormControl.Label>
      <Input
        placeholder="John"
        onChangeText={(value) => setFormData({ ...formData, name: value })}
      />

      <FormControl.Label _text={{ bold: true }}>Email</FormControl.Label>
      <Input
        placeholder="example@gmail.com"
        onChangeText={(value) => setFormData({ ...formData, email: value })}
        keyboardType="email-address"
      />

      <FormControl.Label _text={{ bold: true }}>Password</FormControl.Label>
      <Input
        placeholder="Password must be at least 6 characters"
        onChangeText={(value) => setFormData({ ...formData, password: value })}
        secureTextEntry
      />

      <FormControl.Label _text={{ bold: true }}>Profesional Role</FormControl.Label>
      <Input
        placeholder="Profesional Role"
        onChangeText={(value) => setFormData({ ...formData, ProfesionalRole: value })}
      />

      <FormControl.Label _text={{ bold: true }}>Years of Experience</FormControl.Label>
      <Input
        placeholder="Years of Experience"
        onChangeText={(value) => setFormData({ ...formData, YearsOfExperience: value })}
        keyboardType="numeric"
      />

      <FormControl.Label _text={{ bold: true }}>Main Challenges</FormControl.Label>
      <Input
        placeholder="Main Challenges"
        onChangeText={(value) => setFormData({ ...formData, mainChallenges: value })}
      />
    </FormControl>

    <Button onPress={onSubmit} mt="5" colorScheme="indigo">
      Register
    </Button>
    </View>
     )}
  </VStack>
}



export default function Formulario() {
    return (
        <Formularios />
    )
}
