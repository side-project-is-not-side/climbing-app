import {Platform} from 'react-native';
import Config from 'react-native-config';

const isDev = Config.NODE_ENV === 'development';

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
  POLICY: 'services/policy',
  TERMS: 'services/privacy',
} as const;

export const WEB_URL = {
  HOME: `${BASE_URL}/`,
  MY: `${BASE_URL}/${LINKING_URI.MY}`,
  USER_INFO: `${BASE_URL}/${LINKING_URI.USER_INFO}`,
  POLICY: `${BASE_URL}/${LINKING_URI.POLICY}`,
  TERMS: `${BASE_URL}/${LINKING_URI.TERMS}`,
  CHALLENGE: `${BASE_URL}/${LINKING_URI.CHALLENGE}`,
  MAP: `${BASE_URL}/${LINKING_URI.MAP}`,
  LOGIN: `${BASE_URL}/${LINKING_URI.LOGIN}`,
  ONBOARDING: `${BASE_URL}/${LINKING_URI.ONBOARDING}`,
} as const;

export const KAKAO_LOGIN_URL = 'https://accounts.kakao.com';
export const KAKAO_AUTH_URL = 'https://kauth.kakao.com';
export const NOTION_URLS = ['https://phantom-lake-336.notion.site', 'https://aif.notion.so'];

export const MYPAGE_LINKS = {
  NOTICE: 'https://phantom-lake-336.notion.site/1c81ec2d352e49edab1cfd79bfe836bd?pvs=74',
} as const;
