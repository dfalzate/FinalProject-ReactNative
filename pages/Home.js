import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import PostList from '../components/postsList.component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { TouchableOpacity } from 'react-native';

function HomeScreen(props) {
   const [menuVisible, setMenuVisible] = React.useState(false);

   React.useLayoutEffect(() => {
      props.navigation.setOptions({
         headerRight: () => (
            <TouchableOpacity
               style={{ marginRight: 10 }}
               onPress={() => setMenuVisible(!menuVisible)}
            >
               <FontAwesomeIcon icon={faBars} color='gray' size={30} />
            </TouchableOpacity>
         ),
      });
   });

   return (
      <View style={style.view}>
         <PostList navigation={props.navigation} />
         <View style={menuVisible ? style.menu : { display: 'none' }}>
            <TouchableOpacity
               style={{ marginRight: 10 }}
               onPress={() => {
                  setMenuVisible(false);
                  props.navigation.navigate('User');
               }}
            >
               <View
                  style={{
                     display: 'flex',
                     flexDirection: 'row',
                     alignItems: 'center',
                  }}
               >
                  <FontAwesomeIcon
                     icon={faUserCircle}
                     color='gray'
                     size={30}
                     style={{ margin: 10 }}
                  />
                  <Text>Configuración</Text>
               </View>
            </TouchableOpacity>
         </View>
      </View>
   );
}

const style = StyleSheet.create({
   view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#282C34',
   },
   menu: {
      height: 300,
      width: 200,
      backgroundColor: 'white',
      position: 'absolute',
      top: 0,
      right: 0,
   },
});

export default HomeScreen;
