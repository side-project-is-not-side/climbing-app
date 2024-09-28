import {VerificationInfo} from '../type';
import {ActivityType} from '@entities/challenge/type';
import useSWR from 'swr';

export const useGetActivities = (challengeId: number, activityType: ActivityType) => {
  return useSWR<VerificationInfo[]>(`/v1/records/${activityType}?challengeId=${challengeId}`, {
    onSuccess: data => {
      // console.log(data);
    },
    onError: data => {
      console.log('error');
    },
  });
};
