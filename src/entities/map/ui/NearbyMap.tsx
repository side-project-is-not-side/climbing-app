import {DEFAULT_ZOOM} from '../constants/location';
import {useCurrentLocation} from '../hooks';
import Marker from './Marker';
import {AroundGym} from '@entities/gym/api/types';
import {useGetNearbyGyms} from '@entities/gym/queries';
import {NaverMapView, NaverMapViewRef} from '@mj-studio/react-native-naver-map';
import {Icon} from '@shared/ui';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

type NearbyMapProps = {
  selected?: number;
  setSelected: React.Dispatch<React.SetStateAction<number | undefined>>;
};
const NearbyMap = ({selected, setSelected}: NearbyMapProps) => {
  const {currentLocation, bounds, onCameraChanged, granted} = useCurrentLocation(DEFAULT_ZOOM);
  const ref = useRef<NaverMapViewRef>(null);
  const [currentBounds, setCurrentBounds] = useState(bounds);
  const {data} = useGetNearbyGyms(currentBounds);

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

  const handlePress = () => {
    setCurrentBounds(bounds);
  };

  return (
    <View className="relative w-full h-full">
      <NaverMapView
        className="top-0"
        ref={ref}
        mapType="Basic"
        style={{flex: 1}}
        onCameraChanged={onCameraChanged}
        // initialRegion={currentLocation}
        isShowZoomControls={false}
        initialCamera={{...currentLocation, zoom: DEFAULT_ZOOM}}>
        <Pressable
          className="top-[23px] self-center z-10 flex flex-row gap-x-0.5 items-center justify-center w-[188px] bg-neutral-white rounded-[100px] py-[14px] px-10 shadow-md"
          onPress={handlePress}>
          <Icon className="z-10" name="Redo" size={16} />
          <Text className="z-10 font-text-2">지도에서 재검색</Text>
        </Pressable>

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
    </View>
  );
};

export default NearbyMap;
