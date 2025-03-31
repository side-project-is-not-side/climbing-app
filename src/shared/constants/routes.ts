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
  CHALLENGE_SHARE: 'challenge_share',
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
  POLICY: 'policy',
  TERMS: 'terms',
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
  [CHALLENGE_ROUTES.CHALLENGE]: undefined;
  [CHALLENGE_ROUTES.CHALLENGE_DETAIL]: {
    challengeId: number;
    activityType: ActivityType;
  };
  [CHALLENGE_ROUTES.CHALLENGE_SHARE]: {
    challengeId: number;
    activityType: ActivityType;
  };
  [CHALLENGE_ROUTES.VERIFICATION_HISTORY]: {
    challengeTitle: string;
    challengeId: number;
    activityType: ActivityType;
    isCompleted: boolean;
  };
  [CHALLENGE_ROUTES.VERIFICATION_DETAIL]: {
    challengeId: number;
    challengeTitle: string;
    activityType: ActivityType;
    isCompleted: boolean;
    verificationInfo: VerificationInfo;
  };
  [CHALLENGE_ROUTES.VERIFY_PHOTO]: {
    challengeTitle: string;
    challengeId: number;
  };
  [CHALLENGE_ROUTES.VERIFY_LOCATION]: {
    challengeId: number;
    challengeTitle: string;
  };
  [CHALLENGE_ROUTES.VERIFY_COMPLETE]: {
    challengeId: number;
    challengeTitle: string;
    activityType: ActivityType;
    success: boolean;
    recordCount: number;
    successCount: number;
    successImageUrl: string;
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
  policy: undefined;
  terms: undefined;
  external_page: {
    name: 'NOTICE';
  };
};

export type AllRoute = RootRoute & ChallengeRoute & AuthRoute;
