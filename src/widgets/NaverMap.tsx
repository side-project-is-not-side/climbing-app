import {useEffect, useState} from 'react';
import Geolocation from 'react-native-geolocation-service';
// import NaverMapView, {Coord, Marker} from '@wayne-kim/react-native-nmap';

import {Icon} from '../shared/ui';
import {PermissionsAndroid, Platform} from 'react-native';

const P0 = {latitude: 37.564362, longitude: 126.977011};
const P1 = {latitude: 37.565051, longitude: 126.978567};
const P2 = {latitude: 37.565383, longitude: 126.976292};

const NaverMap = () => {
  const [currentLocation, setCurrentLocation] = useState<Coord>({
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

  return null;

  // return (
  //   <NaverMapView
  //     style={{width: '100%', height: '100%'}}
  //     showsMyLocationButton={true}
  //     center={{...currentLocation, zoom: 16}}
  //     onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>
  //     {currentLocation && (
  //       <Marker
  //         caption={{text: '내 위치', textSize: 14}}
  //         coordinate={currentLocation}>
  //         <Icon name="MarkerCircle" size={24} />
  //       </Marker>
  //     )}
  //     <Marker
  //       coordinate={{
  //         latitude: currentLocation.latitude - 0.001,
  //         longitude: currentLocation.longitude + 0.002,
  //       }}
  //       onClick={() => console.log('onClick! p0')}>
  //       <Icon name="MarkerActive" size={32} />
  //     </Marker>
  //     <Marker
  //       coordinate={{
  //         latitude: currentLocation.latitude + 0.001,
  //         longitude: currentLocation.longitude + 0.001,
  //       }}
  //       pinColor="blue"
  //       onClick={() => console.log('onClick! p1')}>
  //       <Icon name="MarkerDisabled" size={32} />
  //     </Marker>
  //     <Marker
  //       caption={{text: '여기에요!!!', textSize: 14}}
  //       coordinate={{
  //         latitude: currentLocation.latitude - 0.001,
  //         longitude: currentLocation.longitude - 0.001,
  //       }}
  //       pinColor="red"
  //       onClick={() => console.log('onClick! p2')}>
  //       <Icon name="MarkerInactive" size={32} />
  //     </Marker>
  //   </NaverMapView>
  // );
};

export default NaverMap;
