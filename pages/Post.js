import React from 'react';
import { View, Text } from 'react-native';
import { SinglePost } from '../components/singlePost.component';

export function PostScreen(props) {
  const post = props.route.params.post;
  return <SinglePost post={post} />;
}
