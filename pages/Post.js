import React from 'react';
import { View, Text } from 'react-native';
import { SinglePost } from '../components/singlePost.component';

export function PostScreen(props) {
   const postId = props.route.params.postId;
   return <SinglePost postId={postId} />;
}
