import {ActivityType} from '../../entities/challenge/type';
import {VerificationInfo} from '@entities/verification/type';

export const ROOT_ROUTES = {
  HOME: 'home',
  MAP: 'map',
  MY_PAGE: 'my_group',
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

export const MY_ROUTES = {
  MY: 'my',
  USER_INFO: 'user_info',
  EXTERNAL: 'external_page',
} as const;

export const MAP_ROUTES = {
  NEARBY: 'nearby',
  DETAIL: 'detail',
} as const;

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
    activityType: ActivityType;
  };
  verification_history: {
    challengeTitle: string;
    challengeId: number;
    activityType: ActivityType;
  };
  verification_detail: {
    challengeId: number;
    challengeTitle: string;
    activityType: ActivityType;
    verificationInfo: VerificationInfo;
  };
  verify_photo: {
    challengeTitle: string;
    challengeId: number;
  };
  verify_location: {
    challengeId: number;
    challengeTitle: string;
  };
  verify_complete: {
    challengeId: number;
    activityType: ActivityType;
    imageUrl?: string;
  };
};

export type MapRoute = {
  nearby: undefined;
  detail: {
    id: number;
  };
};

export type AuthRoute = {
  onboarding: undefined;
  login: undefined;
};

export type MyRoute = {
  my: undefined;
  user_info: undefined;
  external_page: {
    name: 'NOTICE' | 'TERMS' | 'POLICY';
  };
};

export type AllRoute = RootRoute & ChallengeRoute & AuthRoute;
