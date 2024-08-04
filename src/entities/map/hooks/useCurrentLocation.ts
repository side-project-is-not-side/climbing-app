import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {
  PERMISSIONS,
  request,
  requestLocationAccuracy,
} from 'react-native-permissions';

// 위치를 불러오지 못하면 강남역 기준으로 위치를 잡습니다.
const INITIAL_CENTER = {
  latitude: 37.4979517,
  longitude: 127.0276188,
};

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState({
    ...INITIAL_CENTER,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
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
          setCurrentLocation({latitude, longitude});
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
