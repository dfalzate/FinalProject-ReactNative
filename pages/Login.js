import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoginForm from '../components/loginForm.component';

export function LoginScreen(props) {
   return (
      <View style={style.view}>
         <Text style={style.title}>Login</Text>
         <LoginForm navigation={props.navigation} />
      </View>
   );
}

const style = StyleSheet.create({
   view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
   },
   title: {
      fontSize: 30,
      marginBottom: 20,
   },
});
