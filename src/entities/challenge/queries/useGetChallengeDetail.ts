import {ActivityType, ChallengeDetail} from '../type';
import useSWR from 'swr';

export const useGetChallengeDetail = (challengeId: number, activityType: ActivityType) => {
  return useSWR<ChallengeDetail>(() => `/v1/challenges/${challengeId}/${activityType}`);
};
