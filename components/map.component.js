import React from 'react';
import { View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

function getRegionForCoordinates(points) {
   // points should be an array of { latitude: X, longitude: Y }
   let minX, maxX, minY, maxY;

   // init first point
   ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
   })(points[0]);

   // calculate rect
   points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
   });

   const midX = (minX + maxX) / 2;
   const midY = (minY + maxY) / 2;
   const deltaX = maxX - minX;
   const deltaY = maxY - minY;

   return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY,
   };
}

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
         region={
            route.length > 1 ? getRegionForCoordinates(route) : initialRegion
         }
         zoomEnabled={zoomEnabled}
         showsUserLocation={showsUserLocation}
         liteMode={liteMode}
      >
         {route && route.length > 1 ? (
            <View>
               <Polyline
                  coordinates={route}
                  strokeColor='#000'
                  strokeWidth={4}
               />
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
