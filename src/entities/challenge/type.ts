export type ChallengeStatus = 'SUCCESS' | 'ONGOING' | 'NOT_STARTED';
export type ActivityType = 'PICTURE' | 'VIDEO' | 'LOCATION' | 'ATTENDANCE';

type ChallengeOrigin = {
  id: number;
  title: string;
  summary: string;
  activityCount: number;
  successCount: number;
  activityType: ActivityType;
  successImageUrl: string;
  isChallenging: boolean;
  isTest: boolean;
};

export type Challenge = ChallengeOrigin & {
  successAt: string | null;
};

export type ChallengeDetail = ChallengeOrigin & {
  description: string;
  records: Activity[];
};

export type Activity = ActivityLocation | ActivityPicture | ActivityAttendance;

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
  address: string;
  canChallenge: boolean;
  tags: string[];
};

export type ActivityAttendance = {
  id: number;
  createdAt: Date;
};

export type ChallengeShare = {
  id: number;
  title: string;
  successImageUrl: string;
  userName: string;
  challengeStartDate: string;
  challengeEndDate: string;
  activityType: ActivityType;
  records: Activity[];
};
