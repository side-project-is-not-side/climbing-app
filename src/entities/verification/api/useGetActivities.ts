import useSWR from 'swr';
import { Activity } from '../type';

export const useGetActivities = () => {
  return useSWR<Activity[]>(() => `/v1/activities`);
};
