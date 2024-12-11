import {useLocationStore} from '../store';
import {getBoundByRegion} from '@entities/map/utils/getBoundByRegion';
import {Region} from '@mj-studio/react-native-naver-map';
import {useEffect} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, PermissionStatus, request, requestLocationAccuracy} from 'react-native-permissions';

export const useLocation = () => {
  const {status, setLocationStatus, currentLocation, setBounds, ...props} = useLocationStore();

  useEffect(() => {
    if (!status) {
      const requestPermissions = async () => {
        if (Platform.OS === 'android') {
          const status: PermissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
          setLocationStatus(status);
        } else if (Platform.OS === 'ios') {
          const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
          setLocationStatus(status);
          if (status === 'granted') {
            await requestLocationAccuracy({purposeKey: 'common-purpose'});
          }
        }
      };

      requestPermissions();
    }
  }, [status]);

  const getBounds = () => getBoundByRegion({region: currentLocation});

  const setBoundsByRegion = () => {
    const bounds = getBounds();
    setBounds(bounds);
  };

  const setBoundsByCamera = (currentRegion: Region) => {
    const bounds = getBoundByRegion({region: currentRegion});
    setBounds(bounds);
  };

  return {permissionStatus: status, currentLocation, setBoundsByRegion, setBoundsByCamera, ...props};
};
