import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import { onEmailChange, onPasswordChange } from '../reducers/login.reducer';
import { isLogged, locationPermission } from '../reducers/common.reducer';
import * as Permissions from 'expo-permissions';

function LoginForm(props) {
  React.useEffect(() => {
    Permissions.askAsync(Permissions.LOCATION).then(props.locationPermission());
  }, []);

  async function handlePress() {
    const user = {
      email: props.email,
      password: props.password,
    };
    try {
      const data = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        url: 'https://sheltered-peak-26319.herokuapp.com/users/signin',
        data: user,
      });
      if (data.status === 200) {
        props.isLogged(data.data);
        props.navigation.navigate('CreatePost');
      } else {
        Alert.alert(
          'Error',
          'Please check email or password',
          [{ text: 'OK', onPress: () => console.log(data) }],
          { cancelable: false }
        );
      }
    } catch (error) {
      Alert.alert(
        'Error',
        'Please check email or password',
        [{ text: 'OK', onPress: () => console.log(error) }],
        { cancelable: false }
      );
    }
  }

  return (
    <View>
      <Text>Email</Text>
      <TextInput
        style={style.input}
        keyboardType='email-address'
        onChangeText={(text) => props.onEmailChange(text)}
      />
      <Text>Password</Text>
      <TextInput
        style={style.input}
        secureTextEntry={true}
        onChangeText={(text) => props.onPasswordChange(text)}
      />
      <TouchableOpacity style={style.button} onPress={handlePress}>
        <Text style={style.textButton}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={style.button}
        onPress={() => props.navigation.navigate('Signup')}
      >
        <Text style={style.textButton}>Sign up</Text>
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
    height: 30,
    width: 180,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    email: state.loginReducer.loginEmail,
    password: state.loginReducer.loginPassword,
    locationPermissionState: state.commonReducer.locationPermission,
  };
};

const mapDispatchToProps = {
  onEmailChange,
  onPasswordChange,
  isLogged,
  locationPermission,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
