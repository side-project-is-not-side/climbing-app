import {Asset} from 'react-native-image-picker';
import {Challenge} from '../../entities/challenge/type';

export const ROOT_ROUTES = {
  HOME: '홈',
  MAP: '지도',
  MY_PAGE: '마이페이지',
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

export type RootRoute = {
  홈: undefined;
  지도: undefined;
  마이페이지: undefined;
  challenge_group: undefined;
  auth_group: undefined;
};

export type ChallengeRoute = {
  challenge: undefined;
  challenge_detail: {
    challenge: Challenge;
  };
  verification_history: undefined;
  verification_detail: {};
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
