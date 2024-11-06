import {DEFAULT_ZOOM, INITIAL_CENTER} from '../constants/location';
import {getLatLongDelta} from '../utils';
import {getBoundByRegion} from '../utils/getBoundByRegion';
import {Camera} from '@mj-studio/react-native-naver-map';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, PermissionStatus, request, requestLocationAccuracy} from 'react-native-permissions';

export const useCurrentLocation = (zoomLevel: number) => {
  const [grantStatus, setGrantStatus] = useState<PermissionStatus>();
  const [latitudeDelta, longitudeDelta] = getLatLongDelta(zoomLevel, INITIAL_CENTER.latitude);

  const [currentLocation, setCurrentLocation] = useState({
    ...INITIAL_CENTER,
    latitudeDelta,
    longitudeDelta,
  });

  const [initialLocation, setInitialLocation] = useState<typeof currentLocation>();

  // 권한 요청을 한 번만 실행
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        const status: PermissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        setGrantStatus(status);
      } else if (Platform.OS === 'ios') {
        const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        setGrantStatus(status);
        if (status === 'granted') {
          await requestLocationAccuracy({purposeKey: 'common-purpose'});
        }
      }
    };

    requestPermissions();
  }, []);

  // 위치 추적 및 상태 업데이트를 최적화
  useEffect(() => {
    if (!grantStatus) return;

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
  }, [grantStatus, zoomLevel]);

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

  return {currentLocation, bounds, onCameraChanged, grantStatus, initialLocation};
};
