import {DEFAULT_ZOOM} from '../constants/location';
import {checkIsOutsideSeoul, getLatLongDelta} from '../utils';
import {GymInfo} from '@entities/gym/api/types';
import {LOCATION_강남역, useLocation} from '@entities/location';
import {NaverMapViewProps, Region} from '@mj-studio/react-native-naver-map';
import {debounce} from 'lodash';
import {useEffect, useRef} from 'react';
import Geolocation from 'react-native-geolocation-service';
import Toast from 'react-native-toast-message';

export const useCurrentLocation = (zoomLevel: number) => {
  const {
    permissionStatus,
    currentLocation,
    setCurrentLocation,
    currentBounds,
    setBoundsByRegion,
    initialLocation,
    setInitialLocation,
    setBoundsByCamera,
    setBounds,
  } = useLocation();
  const cameraBoundRef = useRef<Region>();
  const isInitialLocationSet = useRef(false);

  // 위치 추적 및 상태 업데이트를 최적화
  useEffect(() => {
    if (!permissionStatus) return;

    if (permissionStatus !== 'granted') {
      setInitialLocation(LOCATION_강남역);
      return;
    }

    if (!isInitialLocationSet.current) {
      const updateInitialLocation = (latitude: number, longitude: number) => {
        const [newLatitudeDelta, newLongitudeDelta] = getLatLongDelta(zoomLevel, latitude);

        if (!isInitialLocationSet.current) {
          setInitialLocation({
            latitude,
            longitude,
            latitudeDelta: newLatitudeDelta,
            longitudeDelta: newLongitudeDelta,
          });
          isInitialLocationSet.current = true;
        }
      };

      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          updateInitialLocation(latitude, longitude);
        },
        error => console.log(error),
        {enableHighAccuracy: true},
      );
    }

    const updateLocation = (latitude: number, longitude: number) => {
      const [newLatitudeDelta, newLongitudeDelta] = getLatLongDelta(zoomLevel, latitude);
      setCurrentLocation({
        latitude,
        longitude,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      });
    };

    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        updateLocation(latitude, longitude);
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        distanceFilter: 5, // 5미터 이상 이동 시에만 업데이트
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [permissionStatus]);

  useEffect(() => {
    if (initialLocation) {
      setBoundsByRegion();
    }
  }, [initialLocation]);

  const onCameraChanged: NaverMapViewProps['onCameraChanged'] = params => {
    const {latitude, longitude, zoom, reason} = params;
    if (reason === 'Developer' || reason === 'Location') return;

    const [latitudeDelta, longitudeDelta] = getLatLongDelta(zoom ?? DEFAULT_ZOOM, latitude);
    cameraBoundRef.current = {
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    };

    if (checkIsOutsideSeoul({latitude, longitude})) {
      Toast.show({
        text1: '현재 서울과 수도권 지역에서만 암장 찾기가 가능해요.',
        type: 'alert',
        bottomOffset: 100,
      });
    }
  };

  const onSelectedChanged = ({latitude, longitude}: GymInfo['location']) => {
    const [latitudeDelta, longitudeDelta] = getLatLongDelta(DEFAULT_ZOOM, latitude);

    setBoundsByCamera({
      latitude,
      longitude,
      latitudeDelta,
      longitudeDelta,
    });
  };

  const fetchOnCurrentScreen = () => {
    if (cameraBoundRef.current) {
      const region = cameraBoundRef.current;
      setBoundsByCamera(region);
    }
  };

  return {
    currentLocation,
    permissionStatus,
    initialLocation,
    onCameraChanged: debounce(onCameraChanged, 1_000),
    currentBounds,
    fetchOnCurrentScreen,
    onSelectedChanged,
    setBoundsByCamera,
    setBounds,
  };
};
