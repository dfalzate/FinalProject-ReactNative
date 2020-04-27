import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MapComponent } from './map.component';

function Post(props) {
  let initialRegion = props.post.route[0];
  let route = props.post.route;
  return (
    <View style={style.container}>
      <Text>{props.post.title}</Text>
      <MapComponent
        style={style.mapStyle}
        initialRegion={initialRegion}
        route={route}
        showsUserLocation={false}
        zoomEnabled={false}
        liteMode={true}
      />

      <TouchableOpacity
        style={style.button}
        onPress={() => {
          props.navigation.navigate('Post', { post: props.post });
        }}
      >
        <Text style={style.textButton}>Mas información</Text>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 300,
  },
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
});

export default Post;
