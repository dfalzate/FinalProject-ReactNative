import React from 'react';
import { connect } from 'react-redux';
import {
   View,
   Text,
   StyleSheet,
   TouchableOpacity,
   Dimensions,
} from 'react-native';
import { MapComponent } from './map.component';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { CommentComponent } from './comment.component';
import AddCommentComponent from './addComment.component';
import { getPost, getComments } from '../reducers/post.reducer';
import axios from 'axios';
import { SERVER_PATH } from 'react-native-dotenv';

function Post(props) {
   const [post, setPost] = React.useState([]);
   const [comments, setComments] = React.useState({});

   const postId = props.postId;

   React.useEffect(() => {
      getPost();
      getComments();
   }, []);

   async function getPost() {
      const response = await axios({
         method: 'get',
         url: `${SERVER_PATH}/posts/user/post/${postId}`,
      });
      if (response.status === 200) {
         setPost(response.data);
         props.getPost(response.data);
      }
   }

   async function getComments() {
      const response = await axios({
         method: 'get',
         url: `${SERVER_PATH}/posts/comments/${postId}`,
      });

      if (response.status === 200) {
         setComments(response.data);
         props.getComments(response.data);
      }
   }

   return (
      <View style={style.container}>
         <Text style={style.title}>{post.title}</Text>

         {post.route && post.route.length > 0 ? (
            <MapComponent
               style={style.mapStyle}
               route={post.route}
               showsUserLocation={false}
               zoomEnabled={false}
               liteMode={true}
            />
         ) : null}

         <View>
            <Text style={{ fontSize: 15, margin: 10 }}>Comentarios</Text>
            {comments.length > 0 &&
               comments.map((comment) => {
                  const commentId = comment._id;
                  return (
                     <CommentComponent
                        key={comment._id}
                        commentId={commentId}
                        postId={postId}
                     />
                  );
               })}

            <AddCommentComponent postId={postId} />

            <TouchableOpacity
               style={style.buttonInformation}
               onPress={() => {
                  props.navigation.navigate('Post', {
                     postId: postId,
                  });
               }}
            >
               <FontAwesomeIcon
                  icon={faInfoCircle}
                  color='blue'
                  size={40}
                  style={style.menuButtons}
               />
            </TouchableOpacity>
         </View>
      </View>
   );
}

const style = StyleSheet.create({
   container: {
      marginBottom: 15,
      backgroundColor: 'white',
   },
   title: {
      fontSize: 20,
      fontWeight: '700',
      textAlign: 'center',
      margin: 15,
   },
   mapStyle: {
      width: Dimensions.get('window').width - 20,
      height: 300,
      alignSelf: 'center',
   },
   buttonInformation: {
      position: 'absolute',
      right: 5,
      top: -45,
   },
});

const mapStateToProps = (state) => {
   return {
      post: state.postReducer.post,
      comments: state.postReducer.comments,
   };
};

const mapDispatchToProps = {
   getPost,
   getComments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
