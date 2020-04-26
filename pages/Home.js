import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PostList from '../components/postsList.component';

function HomeScreen(props) {
  return (
    <View style={style.view}>
      <Text>Home Screen</Text>
      <PostList navigation={props.navigation} />
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

export default HomeScreen;
