import {NaverMapView, NaverMapViewRef} from '@mj-studio/react-native-naver-map';
import React, {useRef, useState} from 'react';
import {useCurrentLocation} from '../hooks';
import {DEFAULT_ZOOM} from '../constants/location';
import Marker from './Marker';
import { useGetNearbyGyms } from '@entities/gym/queries';
import { AroundGym } from '@entities/gym/api/types';

const NearbyMap = () => {
  const [selected, setSelected] = useState<number>();

  const {currentLocation, bounds, onCameraChanged} =
    useCurrentLocation(DEFAULT_ZOOM);
  const ref = useRef<NaverMapViewRef>(null);
  const {data} = useGetNearbyGyms(bounds);

  const onMarkerTap =
    ({id, latitude, longitude}: AroundGym) =>
    () => {
      setSelected(id);
      if (ref.current) {
        ref.current.animateCameraTo({
          latitude,
          longitude,
          duration: 500,
          easing: 'EaseOut',
          zoom: DEFAULT_ZOOM,
        });
      }
    };

  return (
    <NaverMapView
      ref={ref}
      mapType="Basic"
      style={{flex: 1}}
      onCameraChanged={onCameraChanged}
      initialRegion={currentLocation}>
      {data?.map(({id, latitude, longitude}) => (
        <Marker
          key={id}
          latitude={latitude}
          longitude={longitude}
          type={selected === id ? 'active' : 'inactive'}
          onTap={onMarkerTap({id, latitude, longitude})}
        />
      ))}
    </NaverMapView>
  );
};

export default NearbyMap;
