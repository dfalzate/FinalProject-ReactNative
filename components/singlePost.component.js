import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { MapComponent } from './map.component';
import { ChartComponent } from './chart.component';

export function SinglePost(props) {
   const region = props.post.route[0];
   const route = props.post.route;
   const speed = props.post.speed;
   const level = props.post.level;
   return (
      <View style={style.container}>
         <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            pagingEnabled={true}
         >
            <View style={style.scroll}>
               <MapComponent
                  style={style.mapStyle}
                  region={region}
                  route={route}
                  showsUserLocation={false}
                  zoomEnabled={true}
                  liteMode={false}
               />
               <Text></Text>
            </View>
            <View style={style.scroll}>
               <ChartComponent data={speed} />
            </View>
            <View style={style.scroll}>
               <ChartComponent data={level} />
            </View>
         </ScrollView>
      </View>
   );
}

const style = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
   },
   scroll: {
      width: Dimensions.get('screen').width,
      alignContent: 'center',
      alignItems: 'center',
   },
   mapStyle: {
      width: Dimensions.get('screen').width - 20,
      height: 300,
      marginTop: 10,
      position: 'absolute',
   },
});
