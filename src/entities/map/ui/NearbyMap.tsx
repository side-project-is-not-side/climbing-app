import {
  NaverMapMarkerOverlay,
  NaverMapView,
} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {useCurrentLocation} from '../hooks';
import {DEFAULT_ZOOM, INITIAL_CENTER} from '../constants/location';
import {View} from 'react-native';
import {Icon} from '../../../shared/ui';
import Marker from './Marker';

const NearbyMap = () => {
  const {currentLocation} = useCurrentLocation(DEFAULT_ZOOM);

  return (
    <View style={{flex: 1}}>
      <NaverMapView
        mapType="Basic"
        style={{flex: 1}}
        initialCamera={{...INITIAL_CENTER, zoom: DEFAULT_ZOOM}}>
        <Marker
          latitude={currentLocation.latitude}
          longitude={currentLocation.longitude}
        />
      </NaverMapView>
    </View>
  );
};

export default NearbyMap;
