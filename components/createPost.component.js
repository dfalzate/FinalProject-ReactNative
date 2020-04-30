import React from 'react';
import { connect } from 'react-redux';
import {
   View,
   StyleSheet,
   TouchableOpacity,
   Text,
   TextInput,
   Dimensions,
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
   onTitleChange,
} from '../reducers/createPost.reducer';
import { addPost } from '../reducers/user.reducer';
import axios from 'axios';
import { SERVER_PATH } from 'react-native-dotenv';
import { MapComponent } from './map.component';
import { Dialog, ProgressDialog } from 'react-native-simple-dialogs';
import * as Permissions from 'expo-permissions';

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
   const [saveMenuVisible, setSaveMenuVisible] = React.useState(false);
   const [buttonStartVisible, setButtonStartVisible] = React.useState(true);
   const [buttonStopVisible, setButtonStopVisible] = React.useState(false);
   const [buttonSaveVisible, setButtonSaveVisible] = React.useState(false);
   const [progressVisible, setProgressVisible] = React.useState(false);
   const [finalVisible, setFinalVisible] = React.useState(false);

   React.useEffect(() => {
      getInitialLocation();
   }, []);

   async function getInitialLocation() {
      const result = await Permissions.askAsync(Permissions.LOCATION);
      if (result.granted) {
         let location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
         });
         location.coords.latitudeDelta = 0.001;
         location.coords.longitudeDelta = 0.001;
         props.getInitialLocation(location.coords);
      }
   }

   async function save() {
      const newPost = {
         title: props.title,
         startTime: props.startTime,
         endTime: props.endTime,
         level: props.level,
         route: props.route,
         speed: props.speed,
         comments: [],
      };
      const response = await axios({
         method: 'post',
         url: `${SERVER_PATH}/posts/user/${props.userId}`,
         data: newPost,
      });
      if (response.status === 200) {
         props.addPost(newPost);
         setProgressVisible(false);
         setFinalVisible(true);
      }
   }

   async function startWatch() {
      props.getInitialTime();
      await Location.startLocationUpdatesAsync(GETPOSITION, {
         accuracy: Location.Accuracy.Highest,
         timeInterval: 2000,
         distanceInterval: 5,
      });
   }

   async function stopWatch() {
      props.getFinalTime();
      props.getRoute(route);
      props.getLevel(level);
      props.getSpeed(speed);
      await Location.stopLocationUpdatesAsync(GETPOSITION);
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
               style={buttonStartVisible ? style.button : { display: 'none' }}
               onPress={() => {
                  setButtonStartVisible(false);
                  setButtonStopVisible(true);
                  startWatch();
               }}
            >
               <Text style={style.textButton}>Start</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={
                  buttonStopVisible
                     ? { ...style.button, backgroundColor: 'red' }
                     : { display: 'none' }
               }
               onPress={() => {
                  setButtonSaveVisible(true);
                  setButtonStopVisible(false);
                  stopWatch();
               }}
            >
               <Text style={style.textButton}>Stop</Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={
                  buttonSaveVisible
                     ? { ...style.button, backgroundColor: 'green' }
                     : { display: 'none' }
               }
               onPress={() => {
                  setSaveMenuVisible(true);
               }}
            >
               <Text style={style.textButton}>Save</Text>
            </TouchableOpacity>
            <Dialog visible={saveMenuVisible} title='Grabar'>
               <View>
                  <Text style={style.title__text}>Titulo</Text>
                  <TextInput
                     style={style.title__textInput}
                     placeholder='Título del post'
                     underlineColorAndroid={'blue'}
                     onChangeText={(data) => props.onTitleChange(data)}
                  />
                  <View
                     style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                     }}
                  >
                     <TouchableOpacity
                        style={style.title__button}
                        onPress={() => {
                           setSaveMenuVisible(false);
                           setProgressVisible(true);
                           save();
                        }}
                     >
                        <Text style={style.title__textButton}>Save</Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={style.title__button}
                        onPress={() => props.navigation.navigate('Home')}
                     >
                        <Text style={style.title__textButton}>Cancel</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </Dialog>
            <ProgressDialog
               visible={progressVisible}
               title='Progreso'
               message='Por favor espere.'
            />
            <Dialog visible={finalVisible} title='Información'>
               <View>
                  <Text style={style.title__text}>Grabado correctamente</Text>
                  <View
                     style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                     }}
                  >
                     <TouchableOpacity
                        style={style.title__button}
                        onPress={() => {
                           props.navigation.navigate('Home');
                        }}
                     >
                        <Text style={style.title__textButton}>Ok</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </Dialog>
         </View>
      </View>
   );
}

const style = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      width: Dimensions.get('window').width,
   },
   title: {
      display: 'flex',
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 300,
   },
   title__text: {
      fontSize: 30,
      marginBottom: 10,
   },
   title__textInput: {
      padding: 10,
      height: 50,
      width: '100%',
      backgroundColor: 'white',
   },
   title__button: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      width: 140,
      height: 50,
      backgroundColor: 'blue',
      borderRadius: 10,
      marginTop: 20,
   },
   title__textButton: {
      color: 'white',
      fontSize: 20,
      fontWeight: '400',
   },
   mapStyle: {
      flex: 1,
      width: Dimensions.get('window').width,
      height: '100%',
      position: 'absolute',
   },
   buttons: {
      width: Dimensions.get('window').width,
      height: '100%',
   },
   button: {
      position: 'absolute',
      alignItems: 'center',
      justifyContent: 'center',
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: 'blue',
      bottom: 20,
      right: 20,
   },
   textButton: {
      color: 'white',
      fontWeight: '200',
   },
});

const mapStateToProps = (state) => {
   return {
      initialLocation: state.createPostReducer.initialLocation,
      userId: state.userReducer.id,
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
   onTitleChange,
   addPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePostForm);
