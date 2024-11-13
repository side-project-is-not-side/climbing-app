export type ChallengeStatus = 'SUCCESS' | 'ONGOING' | 'NOT_STARTED';
export type ActivityType = 'PICTURE' | 'VIDEO' | 'LOCATION';

export type Challenge = {
  id: number;
  title: string;
  summary: string;
  activityCount: number;
  successCount: number;
  activityType: ActivityType;
  imageUrl: {
    black: string;
    color: string;
  };
};

export type ChallengeDetail = Challenge & {
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
