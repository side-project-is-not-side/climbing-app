import {DEFAULT_ZOOM} from '../constants/location';
import {useCurrentLocation} from '../hooks';
import Marker from './Marker';
import {AroundGym} from '@entities/gym/api/types';
import {useGetNearbyGyms} from '@entities/gym/queries';
import {NaverMapView, NaverMapViewRef} from '@mj-studio/react-native-naver-map';
import React, {useEffect, useRef} from 'react';

type NearbyMapProps = {
  selected?: number;
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
};
const NearbyMap = ({selected, setSelected}: NearbyMapProps) => {
  const {currentLocation, bounds, onCameraChanged, granted} = useCurrentLocation(DEFAULT_ZOOM);
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

  useEffect(() => {
    if (!granted) return;

    ref.current?.animateCameraTo({
      ...currentLocation,
      zoom: DEFAULT_ZOOM,
    });

    ref.current?.setLocationTrackingMode('NoFollow');
  }, [granted]);

  return (
    <NaverMapView
      ref={ref}
      mapType="Basic"
      style={{flex: 1}}
      onCameraChanged={onCameraChanged}
      // initialRegion={currentLocation}
      isShowZoomControls={false}
      initialCamera={{...currentLocation, zoom: DEFAULT_ZOOM}}>
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
