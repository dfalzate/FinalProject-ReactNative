import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { LoginScreen } from './pages/Login';
import { SignupScreen } from './pages/Signup';
import HomeScreen from './pages/Home';
import { CreatePostScreen } from './pages/CreatePost';
import { PostScreen } from './pages/Post.js';
import UserScreen from './pages/User';

const Stack = createStackNavigator();

function App() {
   return (
      <Provider store={store}>
         <NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
               <Stack.Screen
                  name='Login'
                  component={LoginScreen}
                  options={{ title: 'Login' }}
               />
               <Stack.Screen
                  name='Signup'
                  component={SignupScreen}
                  options={{ title: 'Registro' }}
               />
               <Stack.Screen
                  name='Home'
                  component={HomeScreen}
                  options={{ title: 'Lista de rutas' }}
               />
               <Stack.Screen
                  name='CreatePost'
                  component={CreatePostScreen}
                  options={{ title: 'Crear ruta' }}
               />
               <Stack.Screen
                  name='Post'
                  component={PostScreen}
                  options={{ title: 'Información de la ruta' }}
               />
               <Stack.Screen
                  name='User'
                  component={UserScreen}
                  options={{ title: 'Configuración' }}
               />
            </Stack.Navigator>
         </NavigationContainer>
      </Provider>
   );
}

export default App;
