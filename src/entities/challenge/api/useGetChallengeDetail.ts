import {ChallengeDetail} from '../type';
import useSWR from 'swr';

export const useGetChallengeDetail = (challengeId: number) => {
  return useSWR<ChallengeDetail>(() => `/v1/challenges/${challengeId}`);
};
