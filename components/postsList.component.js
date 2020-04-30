import { SERVER_PATH } from 'react-native-dotenv';
import React from 'react';
import { connect } from 'react-redux';
import {
   View,
   FlatList,
   StyleSheet,
   TouchableOpacity,
   Text,
   Dimensions,
} from 'react-native';
import { onPostsReceived } from '../reducers/user.reducer';
import axios from 'axios';
import Post from '../components/post.component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ProgressDialog } from 'react-native-simple-dialogs';

function PostList(props) {
   const [progressVisible, setProgressVisible] = React.useState(false);

   React.useEffect(() => {
      getPosts();
   }, []);

   async function getPosts() {
      const result = await axios({
         method: 'get',
         url: `${SERVER_PATH}/posts/user/${props.userId}`,
      });
      if (result.status === 200) props.onPostsReceived(result.data);
   }

   return (
      <View style={style.container}>
         <TouchableOpacity
            style={style.button}
            onPress={() => props.navigation.navigate('CreatePost')}
         >
            <FontAwesomeIcon style={style.add} icon={faPlus} size={28} />
         </TouchableOpacity>
         <FlatList
            style={style.flatList}
            data={props.posts}
            renderItem={(data) => {
               const postId = data.item._id;
               return (
                  <View key={postId}>
                     <Post
                        user={props.userId}
                        postId={postId}
                        navigation={props.navigation}
                     />
                  </View>
               );
            }}
            keyExtractor={(post) => `${post._id}`}
         />
         <ProgressDialog
            visible={progressVisible}
            title='Progreso'
            message='Por favor espere.'
         />
      </View>
   );
}

const style = StyleSheet.create({
   container: {
      display: 'flex',
      width: Dimensions.get('screen').width - 30,
      height: '95%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#282C34',
   },
   button: {
      position: 'absolute',
      bottom: 10,
      right: 10,
      width: 70,
      height: 70,
      borderRadius: 35,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      zIndex: 1000,
   },
   add: {
      color: 'white',
   },
   flatList: {
      width: '100%',
      height: '100%',
   },
});

let mapStateToProps = (state) => {
   return {
      userId: state.userReducer.id,
      posts: state.userReducer.posts,
   };
};

let mapDispatchToProps = {
   onPostsReceived,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
