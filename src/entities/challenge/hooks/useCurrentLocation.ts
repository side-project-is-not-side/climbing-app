import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS, request, requestLocationAccuracy} from 'react-native-permissions';

export const useCurrentLocation = () => {
  const [currentLocation, setCurrentLocation] = useState<{latitude: number; longitude: number}>();

  useEffect(() => {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
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
    Geolocation.getCurrentPosition(position => {
      const {latitude, longitude} = position.coords;
      if (latitude && longitude) {
        setCurrentLocation({
          latitude,
          longitude,
        });
      }
    });
  }, []);

  return {currentLocation};
};
