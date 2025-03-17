import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CHALLENGE_ROUTES, ChallengeRoute} from '@shared/constants';
import {useMutateFetcher} from '@shared/hooks/useMutateFetcher';
import {Alert} from 'react-native';
import {mutate} from 'swr';
import useSWRMutation from 'swr/mutation';

export const usePostVerifyLocation = (challengeId: number, challengeTitle: string) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  const fetcher = useMutateFetcher();

  return useSWRMutation(`/v1/challenges/${challengeId}/activities/location`, fetcher, {
    onSuccess(data) {
      if (data.err) return console.log('Error : ' + data);
      if (data.code) {
        Alert.alert(data.message);
        navigation.goBack();
      } else {
        console.log(data);
        mutate(`/v1/challenges/${challengeId}/LOCATION`);
        navigation.navigate(CHALLENGE_ROUTES.VERIFY_COMPLETE, {
          challengeTitle,
          challengeId,
          activityType: 'LOCATION',
          ...data,
        });
      }
    },
    onError(err) {
      console.log(err);
    },
  });
};
