import {Challenge, ChallengeStatus} from '../type';
import useSWRInfinite from 'swr/infinite';

export const useGetChallenge = (
  status: ChallengeStatus,
  pageIndex: number,
  limit: number,
) => {
  return useSWRInfinite<Challenge[]>(
    () =>
      `/v1/challenges?status=${status}&page=${pageIndex}&limit=${limit}&sort=LATEST`,
    {
      parallel: true,
    },
  );
};
