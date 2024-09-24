import {useAuthContext} from '@app/AuthContextProvider';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CHALLENGE_ROUTES, ChallengeRoute} from '@shared/constants';
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
            return authContext?.setToken(null);
          default:
            return console.log(res.status);
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
      if (data.uploadFileUrl) {
        navigation.navigate(CHALLENGE_ROUTES.VERIFY_COMPLETE, {
          imageUrl: data.uploadFileUrl,
          challengeId,
        });
      } else {
        console.log('챌린지 페이지 이동');
      }
    },
    onError(err) {
      console.log(err);
    },
  });
};
