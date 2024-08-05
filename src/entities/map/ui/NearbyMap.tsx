import {NaverMapView} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {useCurrentLocation} from '../hooks';
import {DEFAULT_ZOOM, INITIAL_CENTER} from '../constants/location';
import Marker from './Marker';
import useSWR from 'swr';
import {GetAroundBoulderingGymResponse} from '../api/types';
import {getNearByBoulderingGyms} from '../api';

const ENDPOINT = '/v1/gyms/map';

const NearbyMap = () => {
  const {currentLocation, bounds, onCameraChanged} =
    useCurrentLocation(DEFAULT_ZOOM);

  const params = new URLSearchParams(bounds);

  const {data} = useSWR<GetAroundBoulderingGymResponse>(
    bounds ? `${ENDPOINT}?${params}` : null,
    () => getNearByBoulderingGyms(bounds),
    {
      keepPreviousData: true,
    },
  );

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
