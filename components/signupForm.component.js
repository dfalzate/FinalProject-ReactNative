import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import {
  onNameChange,
  onLastNameChange,
  onEmailChangeSignup,
  onPasswordChangeSignup,
} from '../reducers/signup.reducer';
import axios from 'axios';

function SignForm(props) {
  function handlePress() {
    const newUser = {
      name: props.name,
      lastName: props.lastName,
      email: props.email,
      password: props.password,
    };
    axios({
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      url: 'https://sheltered-peak-26319.herokuapp.com/users/signup',
      data: newUser,
    }).then((data) => {
      Alert.alert(
        'Información',
        'Usuario creado correctamente',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log(data);
              props.navigation.navigate('Login');
            },
          },
        ],
        { cancelable: false }
      );
    });
  }

  return (
    <View>
      <Text>Nombre</Text>
      <TextInput
        style={style.input}
        onChangeText={(text) => props.onNameChange(text)}
      />
      <Text>Apellidos</Text>
      <TextInput
        style={style.input}
        onChangeText={(text) => props.onLastNameChange(text)}
      />
      <Text>Email</Text>
      <TextInput
        keyboardType='email-address'
        style={style.input}
        onChangeText={(text) => props.onEmailChangeSignup(text)}
      />
      <Text>Password</Text>
      <TextInput
        secureTextEntry={true}
        style={style.input}
        onChangeText={(text) => props.onPasswordChangeSignup(text)}
      />
      <TouchableOpacity style={style.button} onPress={handlePress}>
        <Text style={style.textButton}>Crear usuario</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 180,
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  textButton: {
    color: 'white',
    fontWeight: '200',
  },
  input: {
    paddingLeft: 5,
    height: 30,
    width: 180,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

const mapStatesToProps = (state) => {
  return {
    name: state.signupReducer.signupName,
    lastName: state.signupReducer.signupLastName,
    email: state.signupReducer.signupEmail,
    password: state.signupReducer.signupPassword,
  };
};

const mapDispatchToProps = {
  onNameChange,
  onLastNameChange,
  onEmailChangeSignup,
  onPasswordChangeSignup,
};

export default connect(mapStatesToProps, mapDispatchToProps)(SignForm);
