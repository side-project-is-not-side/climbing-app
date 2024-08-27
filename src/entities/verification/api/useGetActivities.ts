import useSWR from 'swr';
import { Activity } from '../type';

export const useGetActivities = (challengeId: number) => {
  return useSWR<Activity[]>(`/v1/activities?challengeId=${challengeId}`, {
    onSuccess: (data) => {
      console.log("success")
      console.log(data)
    },
    onError: (data) => {
      console.log("error")
      console.log(data)
    },
  });
};
