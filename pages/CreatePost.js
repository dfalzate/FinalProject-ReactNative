import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CreatePostFrom from '../components/createPost.component';

export function CreatePostScreen(props) {
  return (
    <View style={style.view}>
      <Text>Crear nuevo post</Text>
      <CreatePostFrom navigation={props.navigation} />
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
