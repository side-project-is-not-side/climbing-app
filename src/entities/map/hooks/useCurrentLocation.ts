import {DEFAULT_ZOOM} from '../constants/location';
import {getLatLongDelta} from '../utils';
import {GymInfo} from '@entities/gym/api/types';
import {useLocation} from '@entities/location';
import {NaverMapViewProps, Region} from '@mj-studio/react-native-naver-map';
import {useEffect, useRef} from 'react';
import Geolocation from 'react-native-geolocation-service';

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

  // 위치 추적 및 상태 업데이트를 최적화
  useEffect(() => {
    if (!permissionStatus) return;

    const updateLocation = (latitude: number, longitude: number) => {
      const [newLatitudeDelta, newLongitudeDelta] = getLatLongDelta(zoomLevel, latitude);

      if (!initialLocation) {
        setInitialLocation({
          latitude,
          longitude,
          latitudeDelta: newLatitudeDelta,
          longitudeDelta: newLongitudeDelta,
        });
      }

      setCurrentLocation({
        latitude,
        longitude,
        latitudeDelta: newLatitudeDelta,
        longitudeDelta: newLongitudeDelta,
      });
    };

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        updateLocation(latitude, longitude);
      },
      error => console.log(error),
      {enableHighAccuracy: true},
    );

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
  }, [permissionStatus, zoomLevel]);

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
    onCameraChanged,
    currentBounds,
    fetchOnCurrentScreen,
    onSelectedChanged,
    setBoundsByCamera,
    setBounds,
  };
};
