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
  activities: {
    imageUrl: string;
    createdAt: Date;
  }[];
};