import {useAuthContext} from '@app/AuthContextProvider';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CHALLENGE_ROUTES, ChallengeRoute} from '@shared/constants';
import {mutate} from 'swr';
import useSWRMutation from 'swr/mutation';

export const usePostVerifyLocation = (challengeId: number) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  const route = useRoute<RouteProp<ChallengeRoute, 'verify_location'>>();

  const authContext = useAuthContext();

  const fetcher = async (url: string, {arg}: {arg: {latitude: number; longitude: number; gymId: number}}) => {
    const token = authContext?.token;

    try {
      const res = await fetch(`https://api.grabbers.co.kr${url}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });

      if (!res.ok) {
        switch (res.status) {
          case 401:
          case 403:
            // 토큰 만료 또는 권한 없음
            return authContext?.setToken(null);
          default:
            return console.log('err code: ' + res.status);
        }
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return res.json();
      } else {
        return res.text();
      }
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };

  return useSWRMutation(`/v1/challenges/${challengeId}/activities/location`, fetcher, {
    onSuccess(data) {
      mutate(`/v1/challenges/${challengeId}/LOCATION`);
      navigation.navigate(CHALLENGE_ROUTES.VERIFY_COMPLETE, {
        challengeId: route.params.challengeId,
        activityType: 'LOCATION',
      });
    },
    onError(err) {
      console.log(err);
    },
  });
};
