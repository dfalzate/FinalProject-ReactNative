import React from 'react';
import { View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

export function MapComponent({
  initialRegion,
  route,
  style,
  zoomEnabled,
  showsUserLocation,
  liteMode,
}) {
  return (
    <MapView
      style={style}
      region={{
        ...initialRegion,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
      zoomEnabled={zoomEnabled}
      showsUserLocation={showsUserLocation}
      liteMode={liteMode}
    >
      {route && route.length > 1 ? (
        <View>
          <Polyline coordinates={route} strokeColor='#000' strokeWidth={4} />
          <Marker
            coordinate={route[0]}
            title={'Inicio'}
            description={'Posición inicial'}
          />
          <Marker
            coordinate={route[route.length - 1]}
            title={'Final'}
            description={'Posición final'}
            pinColor={'green'}
          />
        </View>
      ) : null}
    </MapView>
  );
}
