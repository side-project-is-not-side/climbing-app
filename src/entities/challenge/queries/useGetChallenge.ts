import {Challenge, ChallengeStatus} from '../type';
import useSWRInfinite from 'swr/infinite';

export const useGetChallenge = (status: ChallengeStatus, page: number, limit: number) => {
  return useSWRInfinite<Challenge[]>(() => `/v1/challenges?status=${status}&page=${page}&limit=${limit}&sort=LATEST`, {
    parallel: true,
    revalidateOnMount: true,
  });
};
