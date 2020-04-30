import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { SERVER_PATH } from 'react-native-dotenv';

export function CommentComponent(props) {
   const [comment, setComment] = React.useState({});

   const commentId = props.commentId;
   const postId = props.postId;

   React.useEffect(() => {
      getComment();
   }, []);

   async function getComment() {
      const response = await axios({
         method: 'get',
         url: `${SERVER_PATH}/posts/${postId}/comments/${commentId}`,
      });
      if (response.status === 200) {
         setComment(response.data);
      }
   }

   return (
      <View>
         <View style={style.comments}>
            <FontAwesomeIcon
               icon={faUserCircle}
               size={70}
               color='gray'
               style={style.avatar}
            />
            <View
               style={{
                  width: '90%',
                  height: 100,
               }}
            >
               <Text>{comment.comment}</Text>
            </View>
         </View>
      </View>
   );
}

const style = StyleSheet.create({
   comments: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
   },
   avatar: { margin: 10 },
});
