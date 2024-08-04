import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  PERMISSIONS,
  request,
  requestLocationAccuracy,
} from 'react-native-permissions';
import {getLatLongDelta} from '../utils';
import {INITIAL_CENTER} from '../constants/location';

export const useCurrentLocation = (zoomLevel: number) => {
  const [latitudeDelta, longitudeDelta] = getLatLongDelta(
    zoomLevel,
    INITIAL_CENTER.latitude,
  );

  const [currentLocation, setCurrentLocation] = useState({
    ...INITIAL_CENTER,
    latitudeDelta,
    longitudeDelta,
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then(status => {
        if (status === 'granted') {
          requestLocationAccuracy({
            purposeKey: 'common-purpose',
          });
        }
      });
    }

    if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then(status => {
        if (status === 'granted') {
          requestLocationAccuracy({
            purposeKey: 'common-purpose',
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    // 위치 업데이트 설정
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // currentLocation에 위도, 경도 저장
        if (latitude && longitude) {
          const [latitudeDelta, longitudeDelta] = getLatLongDelta(
            zoomLevel,
            latitude,
          );
          setCurrentLocation({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          });
        }
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true, // 배터리를 더 소모하여 보다 정확한 위치 추적
        distanceFilter: 1,
        interval: 20000,
      },
    );
    // 컴포넌트 언마운트 시 위치 업데이트 중지
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, []);

  return {currentLocation};
};
