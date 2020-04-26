import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
} from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import {
  getInitialLocation,
  getUserId,
  getInitialTime,
  getFinalTime,
  getRoute,
  getLevel,
  getSpeed,
} from '../reducers/createPost.reducer';

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
    props.getUserId(props.userId);
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
      <MapView
        style={style.mapStyle}
        region={props.initialLocation}
        showsUserLocation={true}
        showsMyLocationButton={true}
        zoomEnabled={true}
      >
        {props.route && props.route.length > 0 ? (
          <Polyline
            coordinates={props.route}
            strokeColor='#000'
            strokeWidth={4}
          />
        ) : null}
      </MapView>

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
        <TouchableOpacity
          style={style.button}
          onPress={() => console.log('Save')}
        >
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
    userId: state.commonReducer.userId,
    locationPermission: state.commonReducer.locationPermission,
    route: state.createPostReducer.route,
    initialLocation: state.createPostReducer.initialLocation,
  };
};

const mapDispatchToProps = {
  getInitialLocation,
  getUserId,
  getInitialTime,
  getFinalTime,
  getRoute,
  getLevel,
  getSpeed,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostForm);
