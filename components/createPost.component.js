import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {
  getInitialLocation,
  getInitialTime,
  getFinalTime,
  getRoute,
  getLevel,
  getSpeed,
} from '../reducers/createPost.reducer';
import { addPost } from '../reducers/common.reducer';
import axios from 'axios';
import { SERVER_PATH } from 'react-native-dotenv';
import { MapComponent } from './map.component';

const GETPOSITION = 'GETPOSITION';

let route = [];
let level = [];
let speed = [];

TaskManager.defineTask(GETPOSITION, ({ data, error }) => {
  if (data) {
    const coords = data.locations[0].coords;
    route.push(coords);
    level.push(coords.altitude);
    speed.push(coords.speed);
  } else {
    console.log(error);
  }
});

function CreatePostForm(props) {
  React.useEffect(() => {
    async function getInitialLocation() {
      if (props.locationPermission) {
        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Highest,
        });
        location.coords.latitudeDelta = 0.003; //0.0922;
        location.coords.longitudeDelta = 0.003; //0.0421;
        props.getInitialLocation(location.coords);
      }
    }
    getInitialLocation();
  }, []);

  async function save() {
    const newPost = {
      title: props.title,
      startTime: props.startTime,
      endTime: props.endTime,
      level: props.level,
      route: props.route,
      speed: props.speed,
    };
    console.log('New post', newPost);
    const response = await axios({
      method: 'post',
      url: `${SERVER_PATH}/posts/user/${props.user}`,
      data: newPost,
    });
    if (response.status === 200) {
      props.addPost(newPost);
      Alert.alert(
        'Post created',
        'El post fué creado correctamente',
        [{ text: 'OK', onPress: () => props.navigation.navigate('Home') }],
        { cancelable: false }
      );
    }
  }

  async function startWatch() {
    console.log('Start');
    props.getInitialTime();
    await Location.startLocationUpdatesAsync(GETPOSITION, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 5000,
      distanceInterval: 5,
    });
  }

  async function stopWatch() {
    console.log('Stop');
    props.getFinalTime();
    await Location.stopLocationUpdatesAsync(GETPOSITION);
    props.getRoute(route);
    props.getLevel(level);
    props.getSpeed(speed);
  }

  return (
    <View style={style.container}>
      <MapComponent
        style={style.mapStyle}
        initialRegion={props.initialLocation}
        route={props.route}
        showsUserLocation={true}
        zoomEnabled={true}
        liteMode={false}
      />

      <View style={style.buttons}>
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            startWatch();
          }}
        >
          <Text style={style.textButton}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button}
          onPress={() => {
            stopWatch();
          }}
        >
          <Text style={style.textButton}>Stop</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.button} onPress={() => save()}>
          <Text style={style.textButton}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%',
    position: 'absolute',
  },
  buttons: {
    width: Dimensions.get('window').width,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: 180,
    height: 40,
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  textButton: {
    color: 'white',
    fontWeight: '200',
  },
});

const mapStateToProps = (state) => {
  return {
    locationPermission: state.commonReducer.locationPermission,
    initialLocation: state.createPostReducer.initialLocation,
    user: state.commonReducer.userId,
    title: state.createPostReducer.title,
    startTime: state.createPostReducer.startTime,
    endTime: state.createPostReducer.endTime,
    level: state.createPostReducer.level,
    route: state.createPostReducer.route,
    speed: state.createPostReducer.speed,
  };
};

const mapDispatchToProps = {
  getInitialLocation,
  getInitialTime,
  getFinalTime,
  getRoute,
  getLevel,
  getSpeed,
  addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostForm);
