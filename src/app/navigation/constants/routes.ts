export const ROOT_ROUTES = {
  HOME: 'home',
  MAP: 'map',
  MY_PAGE: 'mypage',
} as const;

export const CHALLENGE_ROUTES = {
  CHALLENGE: 'challenge',
  CHALLENGE_DETAIL: 'challenge_detail',
  VERIFICATION_HISTORY: 'verification_history',
  VERIFY_PHOTO: 'verify_photo',
} as const;

export type RootRoute = {
  home: undefined;
  map: undefined;
  challenge_group: undefined;
  mypage: undefined;
};

export type ChallengeRoute = {
  challenge: undefined;
  challenge_detail: {
    challengeId: string | number;
  };
  verification_history: undefined;
  verify_photo: {
    challengeTitle: string;
  };
};