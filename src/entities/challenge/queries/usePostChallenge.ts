import {ActivityType} from '../type';
import {useMutateFetcher} from '@shared/hooks/useMutateFetcher';
// import {Alert} from 'react-native';
import {mutate} from 'swr';
import useSWRMutation from 'swr/mutation';

export const usePostChallenge = (challengeId: number, activityType: ActivityType) => {
  const fetcher = useMutateFetcher();

  return useSWRMutation(`/v1/challenges/${challengeId}/${activityType}`, fetcher, {
    onSuccess(data) {
      if (!data.err) {
        console.log('success');
        mutate(`/v1/challenges/${challengeId}`);
      } else if (data.code) {
        console.log('error');
        // Alert.alert(data.message);
      }
    },
    onError(err) {
      console.log(err);
    },
  });
};
