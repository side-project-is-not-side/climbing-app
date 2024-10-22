import {ChallengeGym} from '../type';
import Toast from 'react-native-toast-message';
import useSWR from 'swr';

export const useGetChallengeGyms = (id: number) => {
  return useSWR<ChallengeGym[]>(`/v1/challenges/${id}/gyms`, null, {
    onSuccess: data => {
      if (data.every(gym => !gym.canChanllenge)) {
        Toast.show({
          text1: '주위에 인증 가능한 암장이 없습니다.',
          type: 'alert',
        });
      }
    },
  });
};
