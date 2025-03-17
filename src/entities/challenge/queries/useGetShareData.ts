import {ActivityType, ChallengeShare} from '../type';
import useSWR from 'swr';

export const useGetShareData = (challengeId: number, activityType: ActivityType) => {
  return useSWR<ChallengeShare>(() => `/v1/challenges/${challengeId}/${activityType}/to-share`);
};
