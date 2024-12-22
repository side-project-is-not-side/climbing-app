import {DEFAULT_ZOOM} from '../constants/location';
import {useCurrentLocation} from '../hooks';
import Marker from './Marker';
import {AroundGym, GymInfo} from '@entities/gym/api/types';
import {useGetNearbyGyms} from '@entities/gym/queries';
import {NaverMapView, NaverMapViewRef} from '@mj-studio/react-native-naver-map';
import {AnimatedSpinner, Icon, PermissionModal} from '@shared/ui';
import React, {useEffect, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

type NearbyMapProps = {
  selected: Partial<Pick<GymInfo, 'id' | 'location'>>;
  setSelected: React.Dispatch<React.SetStateAction<Partial<Pick<GymInfo, 'id' | 'location'>>>>;
};
const NearbyMap = ({selected, setSelected}: NearbyMapProps) => {
  const {permissionStatus, initialLocation, onCameraChanged, currentBounds, fetchOnCurrentScreen} =
    useCurrentLocation(DEFAULT_ZOOM);
  const [showModal, setShowModal] = useState(false);
  const [isInit, setIsInit] = useState(false);

  const ref = useRef<NaverMapViewRef>(null);
  const {data, isLoading} = useGetNearbyGyms(currentBounds);

  const onMarkerTap =
    ({id, latitude, longitude}: AroundGym) =>
    () => {
      setSelected({id, location: {latitude, longitude}});
    };

  useEffect(() => {
    if (permissionStatus === 'denied' || permissionStatus === 'blocked') {
      setShowModal(true);
    }
  }, [permissionStatus]);

  useEffect(() => {
    if (isInit) return;

    if (initialLocation && ref.current) {
      ref.current.animateCameraTo({
        ...initialLocation,
        zoom: DEFAULT_ZOOM,
      });
      ref.current.setLocationTrackingMode('NoFollow');
    }
    setIsInit(true);
  }, [initialLocation, isInit]);

  useEffect(() => {
    if (selected.location && ref.current) {
      const {latitude, longitude} = selected.location;
      ref.current.animateCameraTo({
        latitude,
        longitude,
        duration: 500,
        easing: 'EaseOut',
        zoom: DEFAULT_ZOOM,
      });
    }
  }, [selected.location]);

  return (
    <>
      <View className="relative w-full h-full">
        <NaverMapView
          className="top-0"
          ref={ref}
          mapType="Basic"
          style={{flex: 1}}
          onCameraChanged={onCameraChanged}
          isShowZoomControls={false}
          initialCamera={initialLocation ? {...initialLocation, zoom: DEFAULT_ZOOM} : undefined}>
          {data?.map(({id, latitude, longitude}) => (
            <Marker
              key={id}
              latitude={latitude}
              longitude={longitude}
              type={selected.id === id ? 'active' : 'inactive'}
              onTap={onMarkerTap({id, latitude, longitude})}
            />
          ))}
        </NaverMapView>

        {isLoading && (
          <View className="absolute w-full h-full flex items-center justify-center">
            <AnimatedSpinner />
          </View>
        )}

        {/* 지도 위에 오버레이된 Pressable */}
        <Pressable
          className="absolute top-[23px] self-center z-10 flex flex-row gap-x-0.5 items-center justify-center w-[188px] bg-neutral-white rounded-[100px] py-[14px] px-10 shadow-md"
          onPress={fetchOnCurrentScreen}>
          <Icon className="z-10" name="Redo" size={16} />
          <Text className="z-10 font-text-2">지도에서 재검색</Text>
        </Pressable>
      </View>

      <PermissionModal
        visible={showModal}
        hide={() => setShowModal(false)}
        modalText="주변 암장 정보를 불러오기 위해/n권한 허용이 필요합니다."
      />
    </>
  );
};

export default React.memo(NearbyMap);
