import {DEFAULT_ZOOM, INITIAL_CENTER} from '../constants/location';
import {getLatLongDelta} from '../utils';
import {getBoundByRegion} from '../utils/getBoundByRegion';
import {useLocation} from '@entities/permission';
import {Camera} from '@mj-studio/react-native-naver-map';
import {useCallback, useEffect, useMemo, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';

export const useCurrentLocation = (zoomLevel: number) => {
  const {permissionStatus} = useLocation();

  const [latitudeDelta, longitudeDelta] = getLatLongDelta(zoomLevel, INITIAL_CENTER.latitude);

  const [currentLocation, setCurrentLocation] = useState({
    ...INITIAL_CENTER,
    latitudeDelta,
    longitudeDelta,
  });

  const [initialLocation, setInitialLocation] = useState<typeof currentLocation>();

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

      setCurrentLocation(prevLocation => {
        if (prevLocation.latitude === latitude && prevLocation.longitude === longitude) {
          return prevLocation;
        }
        return {
          latitude,
          longitude,
          latitudeDelta: newLatitudeDelta,
          longitudeDelta: newLongitudeDelta,
        };
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
        interval: 20000,
      },
    );

    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [permissionStatus, zoomLevel]);

  // 카메라 변경 시 현재 위치 업데이트 최적화
  const onCameraChanged = useCallback((params: Camera) => {
    const {latitude, longitude, zoom} = params;
    const [latitudeDelta, longitudeDelta] = getLatLongDelta(zoom ?? DEFAULT_ZOOM, latitude);

    setCurrentLocation(prevLocation => {
      if (prevLocation.latitude === latitude && prevLocation.longitude === longitude) {
        return prevLocation;
      }
      return {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
      };
    });
  }, []);

  const bounds = useMemo(() => getBoundByRegion({region: currentLocation}), [currentLocation]);

  return {currentLocation, bounds, onCameraChanged, permissionStatus, initialLocation};
};
