import React from 'react';
import { View, StyleSheet, Dimensions, Text, ScrollView } from 'react-native';
import { MapComponent } from './map.component';
import { ChartComponent } from './chart.component';
import axios from 'axios';
import { SERVER_PATH } from 'react-native-dotenv';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
   faCalendarAlt,
   faStopwatch,
   faRoute,
   faMeteor,
   faRoad,
   faTachometerAlt,
} from '@fortawesome/free-solid-svg-icons';

export function SinglePost(props) {
   const [post, setPost] = React.useState({});

   // eslint-disable-next-line react/prop-types
   const postId = props.postId;
   const start = new Date();
   const end = new Date();
   start.setTime(Date.parse(post.startTime));
   end.setTime(Date.parse(post.endTime));
   let diferencia = Math.abs(start.getTime() - end.getTime()) / 1000;

   let dias = 0;
   let horas = 0;
   let minutos = 0;
   let segundos = 0;
   let distancia = 0;

   if (diferencia > 60) {
      diferencia = diferencia / 60;
      if (diferencia > 60) {
         diferencia = diferencia / 60;
         if (diferencia > 24) {
            diferencia = diferencia / 24;
            dias = diferencia;
            horas = (dias % 1) * 24;
            minutos = (horas % 1) * 60;
            segundos = (minutos % 1) * 60;
         } else {
            horas = diferencia;
            minutos = (horas % 1) * 60;
            segundos = (minutos % 1) * 60;
         }
      } else {
         minutos = diferencia;
         segundos = (minutos % 1) * 60;
      }
   } else {
      segundos = diferencia;
   }

   const getKilometros = function (lat1, lon1, lat2, lon2) {
      const rad = function (x) {
         return (x * Math.PI) / 180;
      };
      var R = 6378.137; //Radio de la tierra en km
      var dLat = rad(lat2 - lat1);
      var dLong = rad(lon2 - lon1);
      var a =
         Math.sin(dLat / 2) * Math.sin(dLat / 2) +
         Math.cos(rad(lat1)) *
            Math.cos(rad(lat2)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d.toFixed(3); //Retorna tres decimales
   };

   if (post.route) {
      for (let i = 0; i < post.route.length - 1; i++) {
         const coord1 = post.route[i];
         const coord2 = post.route[i + 1];
         distancia += parseFloat(
            getKilometros(
               coord1.latitude,
               coord1.longitude,
               coord2.latitude,
               coord2.longitude
            )
         );
      }
   }

   React.useEffect(() => {
      getPost();
   }, []);

   async function getPost() {
      const response = await axios({
         method: 'get',
         url: `${SERVER_PATH}/posts/user/post/${postId}`,
      });
      if (response.status === 200) {
         setPost(response.data);
      }
   }

   return (
      <ScrollView
         horizontal={true}
         showsHorizontalScrollIndicator={true}
         pagingEnabled={true}
      >
         {post.route ? (
            <View style={style.scroll}>
               <MapComponent
                  style={style.mapStyle}
                  region={post.route[0]}
                  route={post.route}
                  showsUserLocation={false}
                  zoomEnabled={true}
                  liteMode={false}
               />

               <View style={style.textoRuta}>
                  <Text style={style.textoRuta_text}>
                     Información de recorrido
                  </Text>
                  <Text style={style.textoRuta_text}>
                     <FontAwesomeIcon icon={faCalendarAlt} /> Inicio:
                     {start.toLocaleDateString()} {start.toLocaleTimeString()}
                  </Text>
                  <Text style={style.textoRuta_text}>
                     <FontAwesomeIcon icon={faCalendarAlt} /> Final:
                     {end.toLocaleDateString()} {end.toLocaleTimeString()}
                  </Text>
                  <Text style={style.textoRuta_text}>
                     <FontAwesomeIcon icon={faStopwatch} /> Tiempo total:
                     {Math.floor(dias)}
                     {'d'}
                     {Math.floor(horas)}
                     {'h'}
                     {Math.floor(minutos)}
                     {'m'}
                     {Math.floor(segundos)}
                     {'s'}
                  </Text>
                  <Text style={style.textoRuta_text}>
                     <FontAwesomeIcon icon={faRoute} /> Distancia recorrida:{' '}
                     {distancia}km
                  </Text>
               </View>
            </View>
         ) : null}

         {post.speed ? (
            <View style={style.scroll}>
               <ChartComponent data={post.speed} />
               <View style={style.textoRuta}>
                  <Text style={style.textoRuta_text}>
                     Información de la velocidad
                  </Text>
                  <Text style={style.textoRuta_text}>
                     <FontAwesomeIcon icon={faTachometerAlt} /> Velocidad
                     máxima: {Math.max(...post.speed).toFixed(3)}km/h
                  </Text>
                  <Text style={style.textoRuta_text}>
                     <FontAwesomeIcon icon={faTachometerAlt} /> Velocidad
                     mínima: {Math.min(...post.speed).toFixed(3)}km/h
                  </Text>
                  <Text style={style.textoRuta_text}>
                     <FontAwesomeIcon icon={faMeteor} /> Velocidad promedio:{' '}
                     {(
                        post.speed.reduce((acu, act) => acu + act) /
                        post.speed.length
                     ).toFixed(3)}
                     km/h
                  </Text>
               </View>
            </View>
         ) : null}

         {post.level ? (
            <View style={style.scroll}>
               <ChartComponent data={post.level} />
               <View style={style.textoRuta}>
                  <Text style={style.textoRuta_text}>
                     Información de la altura
                  </Text>
                  <Text style={style.textoRuta_text}>
                     <FontAwesomeIcon icon={faRoad} /> Altura máxima:{' '}
                     {Math.max(...post.level).toFixed(3) * 100}mts
                  </Text>
                  <Text style={style.textoRuta_text}>
                     <FontAwesomeIcon icon={faRoad} /> Altura mínima:{' '}
                     {Math.min(...post.level).toFixed(3) * 100}mts
                  </Text>
                  <Text style={style.textoRuta_text}>
                     <FontAwesomeIcon icon={faRoad} /> Altura promedio:{' '}
                     {(
                        post.level.reduce((acu, act) => acu + act) /
                        post.level.length
                     ).toFixed(3) * 100}
                     mts
                  </Text>
               </View>
            </View>
         ) : null}
      </ScrollView>
   );
}

const style = StyleSheet.create({
   scroll: {
      display: 'flex',
      width: Dimensions.get('screen').width,
      height: '100%',
      alignItems: 'center',
   },
   mapStyle: {
      width: Dimensions.get('screen').width - 15,
      height: 300,
      margin: 15,
   },
   textoRuta: {
      width: Dimensions.get('screen').width - 30,
   },
   textoRuta_text: { fontSize: 20, marginBottom: 15 },
});
