import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform, View} from 'react-native';
import {NaverMapView} from '@mj-studio/react-native-naver-map';
import Geolocation from 'react-native-geolocation-service';
import {
  PERMISSIONS,
  request,
  requestLocationAccuracy,
} from 'react-native-permissions';

const NaverMap = () => {
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

  return (
    <View style={{flex: 1}}>
      <NaverMapView
        mapType="Basic"
        style={{flex: 1}}
        ></NaverMapView>
    </View>
  );
};

export default NaverMap;
