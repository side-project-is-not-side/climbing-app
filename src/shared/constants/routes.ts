import {Asset} from 'react-native-image-picker';
import {Challenge} from '../../entities/challenge/type';

export const ROOT_ROUTES = {
  HOME: 'home',
  MAP: 'map',
  MY_PAGE: 'mypage',
  CHALLENGE: 'challenge_group',
  AUTH: 'auth_group',
} as const;

export const CHALLENGE_ROUTES = {
  CHALLENGE: 'challenge',
  CHALLENGE_DETAIL: 'challenge_detail',
  VERIFICATION_HISTORY: 'verification_history',
  VERIFICATION_DETAIL: 'verification_detail',
  VERIFY_PHOTO: 'verify_photo',
  VERIFY_LOCATION: 'verify_location',
  VERIFY_GUIDE: 'verify_guide',
  VERIFY_COMPLETE: 'verify_complete',
} as const;

export const AUTH_ROUTES = {
  ONBOARDING: 'onboarding',
  LOGIN: 'login',
} as const;

export const MAP_ROUTES = {
  NEARBY: 'nearby',
  DETAIL: 'detail',
};
export type RootRoute = {
  [ROOT_ROUTES.HOME]: undefined;
  [ROOT_ROUTES.MAP]: undefined;
  [ROOT_ROUTES.MY_PAGE]: undefined;
  [ROOT_ROUTES.CHALLENGE]: undefined;
  [ROOT_ROUTES.AUTH]: undefined;
};

export type ChallengeRoute = {
  challenge: undefined;
  challenge_detail: {
    challengeId: number;
  };
  verification_history: undefined;
  verification_detail: {
    imageUrl: string;
    createdAt: Date
  };
  verify_photo: {
    challengeTitle: string;
    challengeId: number;
  };
  verify_location: {
    challengeTitle: string;
    challengeId: number;
  };
  verify_guide: {
    challengeTitle: string;
    challengeId: number;
  };
  verify_complete: {
    challengeId: number;
    image: Asset;
  };
};

export type AuthRoute = {
  onboarding: undefined;
  login: undefined;
};

export type AllRoute = RootRoute & ChallengeRoute & AuthRoute;
