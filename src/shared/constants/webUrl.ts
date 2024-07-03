import {Platform} from 'react-native';
import Config from 'react-native-config';

const isDev = false ?? Config.NODE_ENV === 'development';

const BASE_URL = isDev
  ? Platform.OS === 'android'
    ? 'http://10.0.2.2:3000'
    : 'http://localhost:3000'
  : 'https://www.grabbers.co.kr';

export const LINKING_URI = {
  MY: 'my',
  CHALLENGE: 'challenge',
} as const;

export const WEB_URL = {
  HOME: `${BASE_URL}/`,
  MY: `${BASE_URL}/${LINKING_URI.MY}`,
  CHALLENGE: `${BASE_URL}/${LINKING_URI.CHALLENGE}`,
} as const;
