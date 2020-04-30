import { SERVER_PATH } from 'react-native-dotenv';
import React from 'react';
import { connect } from 'react-redux';
import {
   TouchableOpacity,
   Text,
   TextInput,
   View,
   StyleSheet,
   Alert,
   Dimensions,
} from 'react-native';
import axios from 'axios';
import { onEmailChange, onPasswordChange } from '../reducers/login.reducer';
import { onUserReceived } from '../reducers/user.reducer';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { getInitialLocation } from '../reducers/createPost.reducer';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

function LoginForm(props) {
   React.useEffect(() => {
      getPermission();
   }, []);

   async function getPermission() {
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
            url: `${SERVER_PATH}/users/signin`,
            data: user,
         });
         if (data.status === 200) {
            props.onUserReceived(data.data);
            props.navigation.navigate('Home');
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
         <View
            style={{
               display: 'flex',
               flexDirection: 'row',
               alignItems: 'center',
            }}
         >
            <FontAwesomeIcon icon={faEnvelope} size={15} />
            <Text> Email</Text>
         </View>
         <TextInput
            style={style.input}
            keyboardType='email-address'
            onChangeText={(text) => props.onEmailChange(text)}
            placeholder='Email'
            underlineColorAndroid='blue'
         />
         <View
            style={{
               display: 'flex',
               flexDirection: 'row',
               alignItems: 'center',
            }}
         >
            <FontAwesomeIcon icon={faLock} size={15} />
            <Text> Password</Text>
         </View>
         <TextInput
            style={style.input}
            secureTextEntry={true}
            onChangeText={(text) => props.onPasswordChange(text)}
            placeholder='Password'
            underlineColorAndroid='blue'
         ></TextInput>
         <View
            style={{
               display: 'flex',
               alignContent: 'center',
               alignItems: 'center',
            }}
         >
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
      </View>
   );
}

const style = StyleSheet.create({
   button: {
      marginTop: 10,
      width: 150,
      display: 'flex',
      flexDirection: 'row',
      height: 45,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'blue',
      borderRadius: 10,
   },
   textButton: {
      display: 'flex',
      color: 'white',
      fontWeight: '200',
      fontSize: 17,
   },
   input: {
      height: 50,
      width: Dimensions.get('screen').width - 100,
      borderColor: 'gray',
      marginBottom: 10,
      padding: 10,
   },
});

const mapStateToProps = (state) => {
   return {
      email: state.loginReducer.loginEmail,
      password: state.loginReducer.loginPassword,
   };
};

const mapDispatchToProps = {
   onEmailChange,
   onPasswordChange,
   getInitialLocation,
   onUserReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
