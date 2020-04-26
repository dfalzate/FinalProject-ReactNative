import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

function Post(props) {
  return (
    <View>
      <Text>{props.post.title}</Text>
      <MapView style={style.mapStyle} />
    </View>
  );
}

const style = StyleSheet.create({
  mapStyle: {
    width: 300,
    height: 300,
  },
});

export default Post;
