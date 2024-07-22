import {Asset} from 'react-native-image-picker';
import {Challenge} from '../../entities/challenge/type';

export const ROOT_ROUTES = {
  HOME: 'home',
  MAP: 'map',
  MY_PAGE: 'my',
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
  home: undefined;
  map: undefined;
  my: undefined;
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
