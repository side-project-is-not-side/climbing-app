import {Platform} from 'react-native';
import Config from 'react-native-config';

const isDev = false ?? Config.NODE_ENV === 'development';

export const BASE_URL = isDev
  ? Platform.OS === 'android'
    ? 'http://192.168.219.106:3000'
    : 'http://localhost:3000'
  : 'https://www.grabbers.co.kr';

export const LINKING_URI = {
  MY: 'my',
  CHALLENGE: 'challenge',
  MAP: 'map',
  LOGIN: 'login',
  ONBOARDING: 'onboarding',
  USER_INFO: 'my/user-info',
} as const;

export const WEB_URL = {
  HOME: `${BASE_URL}/`,
  MY: `${BASE_URL}/${LINKING_URI.MY}`,
  USER_INFO: `${BASE_URL}/${LINKING_URI.USER_INFO}`,
  CHALLENGE: `${BASE_URL}/${LINKING_URI.CHALLENGE}`,
  MAP: `${BASE_URL}/${LINKING_URI.MAP}`,
  LOGIN: `${BASE_URL}/${LINKING_URI.LOGIN}`,
  ONBOARDING: `${BASE_URL}/${LINKING_URI.ONBOARDING}`,
} as const;

export const KAKAO_LOGIN_URL = 'https://accounts.kakao.com';
export const KAKAO_AUTH_URL = 'https://kauth.kakao.com';
