import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { MapComponent } from './map.component';
import { LineChart } from 'react-native-chart-kit';

export function SinglePost(props) {
  const initialLocation = props.post.route[0];
  const route = props.post.route;
  const speed = props.post.speed;
  const level = props.post.level;
  return (
    <View style={style.container}>
      <MapComponent
        style={style.mapStyle}
        initialRegion={initialLocation}
        route={route}
        showsUserLocation={false}
        zoomEnabled={true}
        liteMode={false}
      />
      <LineChart
        data={{
          datasets: [
            // {
            //   data: speed,
            // },
            {
              data: level,
            },
          ],
        }}
        width={Dimensions.get('window').width - 20} // from react-native
        height={220}
        yAxisSuffix=''
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: 'white',
          backgroundGradientFrom: 'white',
          backgroundGradientTo: '',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 320,
          borderRadius: 16,
        }}
      />
      <Text style={{ position: 'absolute', marginTop: 550 }}>Speed Km/h</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: 300,
    position: 'absolute',
  },
});
