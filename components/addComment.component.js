import React from 'react';
import {
   View,
   Text,
   TouchableOpacity,
   StyleSheet,
   TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import { onCommentChange } from '../reducers/comment.reducer';
import { Dialog } from 'react-native-simple-dialogs';
import axios from 'axios';
import { SERVER_PATH } from 'react-native-dotenv';

function AddCommentComponent(props) {
   const [addCommentVisible, setAddCommentVisible] = React.useState(false);
   const [grabadoVisible, setGrabadoVisible] = React.useState(false);

   async function save() {
      const newComment = {
         comment: props.comment,
      };
      const response = await axios({
         method: 'post',
         url: `${SERVER_PATH}/posts/comments/${props.postId}`,
         data: newComment,
      });
      if (response.status == 200) {
         setAddCommentVisible(false);
         setGrabadoVisible(true);
      }
   }

   return (
      <View>
         <TouchableOpacity
            style={{
               ...style.title__button,
               alignSelf: 'center',
               margin: 15,
               width: '65%',
            }}
            onPress={() => {
               setAddCommentVisible(true);
            }}
         >
            <Text style={{ color: 'white' }}>Agregar comentario</Text>
         </TouchableOpacity>
         <Dialog visible={addCommentVisible} title='Grabar'>
            <View>
               <Text style={style.title__text}>Comentario</Text>
               <TextInput
                  style={style.title__textInput}
                  placeholder='Título del post'
                  underlineColorAndroid={'blue'}
                  onChangeText={(data) => props.onCommentChange(data)}
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
                        save();
                     }}
                  >
                     <Text style={style.title__textButton}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={style.title__button}
                     onPress={() => setAddCommentVisible(false)}
                  >
                     <Text style={style.title__textButton}>Cancel</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Dialog>
         <Dialog visible={grabadoVisible} title='Información'>
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
                        setGrabadoVisible(false);
                     }}
                  >
                     <Text style={style.title__textButton}>Ok</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Dialog>
      </View>
   );
}

const style = StyleSheet.create({
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
});

const mapStateToProps = (state) => {
   return {
      comment: state.commentReducer.comment,
   };
};

const mapDispatchToProps = {
   onCommentChange,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(AddCommentComponent);
