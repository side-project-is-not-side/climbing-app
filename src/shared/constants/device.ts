import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const userAgent = `Mozilla/5.0 (Linux; ${Platform.select({
  android: 'Android',
  ios: 'iPhone',
})}) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 GrabbersRNApp/${DeviceInfo.getVersion()}`;
