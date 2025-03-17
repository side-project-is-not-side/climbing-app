import {ActivityType} from '../type';
import {useMutateFetcher} from '@shared/hooks/useMutateFetcher';
// import {Alert} from 'react-native';
import {KeyedMutator, mutate} from 'swr';
import useSWRMutation from 'swr/mutation';

export const usePostChallenge = (challengeId: number, mutate: KeyedMutator<any>) => {
  const fetcher = useMutateFetcher();

  return useSWRMutation(`/v1/challenges/${challengeId}`, fetcher, {
    onSuccess(data) {
      console.log(`/v1/challenges/${challengeId}`);
      if (!data.err) {
        console.log('success');
        mutate();
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
