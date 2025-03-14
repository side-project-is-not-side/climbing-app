import {useAuthContext} from '@app/AuthContextProvider';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CHALLENGE_ROUTES, ChallengeRoute} from '@shared/constants';
import {Alert} from 'react-native';
import useSWRMutation from 'swr/mutation';

export const usePostAttendance = (challengeId: number) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  const authContext = useAuthContext();

  const fetcher = async (url: string) => {
    const token = authContext?.token;

    try {
      const res = await fetch(`https://api.grabbers.co.kr${url}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        switch (res.status) {
          case 401:
          case 403:
            // 토큰 만료 또는 권한 없음
            authContext?.setToken(null);
            return;
          default:
            return res.json();
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

  return useSWRMutation(`/v1/challenges/${challengeId}/activities/attendance`, fetcher, {
    onSuccess(data) {
      if (!data.err) {
        navigation.navigate(CHALLENGE_ROUTES.VERIFY_COMPLETE, {
          challengeId,
          activityType: 'ATTENDANCE',
        });
      } else if (data.code) {
        Alert.alert(data.message);
        navigation.goBack();
      }
    },
    onError(err) {
      console.log(err);
    },
  });
};
