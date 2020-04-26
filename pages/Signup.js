import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignupForm from '../components/signupForm.component';

export function SignupScreen({ navigation }) {
  return (
    <View style={style.view}>
      <Text>Sign up</Text>
      <SignupForm navigation={navigation} />
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
