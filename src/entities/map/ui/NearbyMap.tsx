import {NaverMapView} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {useCurrentLocation} from '../hooks';
import {DEFAULT_ZOOM, INITIAL_CENTER} from '../constants/location';
import Marker from './Marker';

const NearbyMap = () => {
  const {currentLocation} = useCurrentLocation(DEFAULT_ZOOM);

  return (
    <NaverMapView
      mapType="Basic"
      style={{flex: 1}}
      initialCamera={{...INITIAL_CENTER, zoom: DEFAULT_ZOOM}}>
      <Marker
        latitude={currentLocation.latitude}
        longitude={currentLocation.longitude}
      />
    </NaverMapView>
  );
};

export default NearbyMap;
