import React from 'react';
import { connect } from 'react-redux';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import { getPosts } from '../reducers/common.reducer';
import axios from 'axios';
import Post from '../components/post.component';

function PostList(props) {
  React.useEffect(() => {
    axios({
      method: 'get',
      url: `https://sheltered-peak-26319.herokuapp.com/posts/user/${props.userId}`,
    }).then(({ data }) => {
      props.getPosts(data);
    });
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={style.button}
        onPress={() => props.navigation.navigate('CreatePost')}
      >
        <Text style={style.textButton}>Create post</Text>
      </TouchableOpacity>
      <FlatList
        data={props.posts}
        renderItem={(data) => {
          return (
            <View>
              <Post post={data.item} />
            </View>
          );
        }}
        keyExtractor={(post) => `${post._id}`}
      />
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    marginTop: 10,
    width: 180,
    display: 'flex',
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  textButton: {
    color: 'white',
    fontWeight: '200',
  },
  mapStyle: {
    width: 300,
    height: 300,
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
