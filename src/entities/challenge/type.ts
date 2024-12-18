export type ChallengeStatus = 'SUCCESS' | 'ONGOING' | 'NOT_STARTED';
export type ActivityType = 'PICTURE' | 'VIDEO' | 'LOCATION';

type ChallengeOrigin = {
  id: number;
  title: string;
  summary: string;
  activityCount: number;
  successCount: number;
  activityType: ActivityType;
  successImageUrl: string;
};

export type Challenge = ChallengeOrigin & {
  successAt: string | null;
};

export type ChallengeDetail = ChallengeOrigin & {
  description: string;
  records: Activity[];
};

export type Activity = ActivityLocation | ActivityPicture;

export type ActivityPicture = {
  id: number;
  imageUrl: string;
  createdAt: Date;
};

export type ActivityLocation = {
  id: number;
  gymName: string;
  gymAddress: string;
  createdAt: Date;
};

export type ChallengeGym = {
  id: number;
  name: string;
  thumbnailImageUrl: string;
  latitude: number;
  longitude: number;
  distance: number;
  canChallenge: boolean;
};
