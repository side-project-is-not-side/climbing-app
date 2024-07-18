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
  VERIFY_PHOTO: 'verify_photo',
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
    // challengeId: string | number;
    challenge: Challenge;
  };
  verification_history: undefined;
  verify_photo: {
    challengeTitle: string;
  };
};

export type AuthRoute = {
  onboarding: undefined;
  login: undefined;
};

export type AllRoute = RootRoute & ChallengeRoute & AuthRoute;
