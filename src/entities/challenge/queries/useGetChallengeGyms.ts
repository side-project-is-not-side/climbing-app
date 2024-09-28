import {ChallengeGym} from '../type';
import useSWR from 'swr';

export const useGetChallengeGyms = (id: number) => {
  return useSWR<ChallengeGym[]>(`/v1/challenges/${id}/gyms`);
};
