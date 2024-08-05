import {NaverMapView} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {useCurrentLocation} from '../hooks';
import {DEFAULT_ZOOM} from '../constants/location';
import Marker from './Marker';
import {useGetNearbyGyms} from '../queries';

const NearbyMap = () => {
  const {currentLocation, bounds, onCameraChanged} =
    useCurrentLocation(DEFAULT_ZOOM);

  const {data} = useGetNearbyGyms(bounds);

  return (
    <NaverMapView
      mapType="Basic"
      style={{flex: 1}}
      onCameraChanged={onCameraChanged}
      initialRegion={currentLocation}>
      {data?.map(({id, latitude, longitude}) => (
        <Marker
          key={id}
          latitude={latitude}
          longitude={longitude}
          type="inactive"
        />
      ))}
    </NaverMapView>
  );
};

export default NearbyMap;
