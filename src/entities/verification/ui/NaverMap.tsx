import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import {NaverMapView} from '@mj-studio/react-native-naver-map';
import Geolocation from 'react-native-geolocation-service';

const NaverMap = () => {
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 37,
    longitude: 127,
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
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

  return (
    <View style={{flex: 1}}>
      <NaverMapView
        mapType="Basic"
        style={{flex: 1}}
        initialCamera={{...currentLocation, zoom: 14}}></NaverMapView>
    </View>
  );
};

export default NaverMap;
