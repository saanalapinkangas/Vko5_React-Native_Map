import React from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default function Map(props) {

  return (
    <>
    <MapView
      style={styles.map}
      region={props.location}
      mapType={props.mapType}
      //onLongPress={showMarker}
    />
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
})