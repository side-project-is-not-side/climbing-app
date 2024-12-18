import {useAuthContext} from '@app/AuthContextProvider';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CHALLENGE_ROUTES, ChallengeRoute} from '@shared/constants';
import {Alert} from 'react-native';
import {mutate} from 'swr';
import useSWRMutation from 'swr/mutation';

export const usePostVerifyPicture = (challengeId: number) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  const authContext = useAuthContext();

  const fetcher = async (url: string, {arg}: {arg: FormData}) => {
    const token = authContext?.token;

    try {
      const res = await fetch(`https://api.grabbers.co.kr${url}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: arg,
      });

      if (!res.ok) {
        switch (res.status) {
          case 401:
          case 403:
            // 토큰 만료 또는 권한 없음
            authContext?.setToken(null);
            return;
          default:
            return {err: res.status};
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

  return useSWRMutation(`/v1/challenges/${challengeId}/activities/picture`, fetcher, {
    onSuccess(data) {
      if (data?.uploadFileUrl) {
        mutate(`/v1/challenges/${challengeId}/PICTURE`);
        navigation.navigate(CHALLENGE_ROUTES.VERIFY_COMPLETE, {
          imageUrl: data.uploadFileUrl,
          challengeId,
          activityType: 'PICTURE',
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
