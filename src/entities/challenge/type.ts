export type Challenge = {
  id: number;
  activityType: 'PICTURE' | 'VIDEO' | 'LOCATION';
  title: string;
  summary: string;
  activityCount: number;
  successCount: number;
  imageUrl: {
    black: string;
    color: string;
  };
};
