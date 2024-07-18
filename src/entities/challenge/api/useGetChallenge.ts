import useSWR from 'swr';
import {Challenge, ChallengeStatus} from '../type';
import useSWRInfinite from 'swr/infinite';

export const useGetChallenge = (status: ChallengeStatus, pageIndex: number) => {
  // return useSWR(`/v1/challenges?status=${status}&page=1&limit=2&sort=LATEST`);
  return useSWRInfinite<Challenge[]>(
    () =>
      `/v1/challenges?status=${status}&page=${pageIndex}&limit=10&sort=LATEST`,
    {
      parallel: true,
    },
  );
};
