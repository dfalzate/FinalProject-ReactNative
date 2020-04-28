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
import { getPosts } from '../reducers/common.reducer';
import axios from 'axios';
import Post from '../components/post.component';
import { SERVER_PATH } from 'react-native-dotenv';

function PostList(props) {
   React.useEffect(() => {
      axios({
         method: 'get',
         url: `${SERVER_PATH}/posts/user/${props.userId}`,
      }).then(({ data }) => {
         props.getPosts(data);
      });
   }, []);

   return (
      <View style={style.container}>
         <TouchableOpacity
            style={style.button}
            onPress={() => props.navigation.navigate('CreatePost')}
         >
            <Text style={style.textButton}>Create post</Text>
         </TouchableOpacity>
         <FlatList
            style={style.flatList}
            data={props.posts}
            renderItem={(data) => {
               return (
                  <View>
                     <Post post={data.item} navigation={props.navigation} />
                  </View>
               );
            }}
            keyExtractor={(post) => `${post._id}`}
         />
      </View>
   );
}

const style = StyleSheet.create({
   container: {
      display: 'flex',
      width: Dimensions.get('screen').width - 20,
      height: '95%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   button: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 90,
      height: 90,
      borderRadius: 45,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      zIndex: 1000,
   },
   textButton: {
      color: 'white',
      fontWeight: '200',
   },
   flatList: {
      width: '100%',
      height: '100%',
   },
});

let mapStateToProps = (state) => {
   return {
      userId: state.commonReducer.userId,
      posts: state.commonReducer.posts,
   };
};

let mapDispatchToProps = {
   getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);
