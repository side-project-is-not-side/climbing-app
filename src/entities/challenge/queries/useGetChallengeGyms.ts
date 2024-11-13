import {ChallengeGym} from '../type';
import {Location} from '@entities/gym/api/types';
import Toast from 'react-native-toast-message';
import useSWR from 'swr';

export const useGetChallengeGyms = (id: number, location: Location | undefined) => {
  return useSWR<ChallengeGym[]>(
    location && `/v1/challenges/${id}/gyms?latitude=${location.latitude}&longitude=${location.longitude}`,
    null,
    {
      onSuccess: data => {
        if (data && data.every(gym => !gym.canChallenge)) {
          Toast.show({
            text1: '주위에 인증 가능한 암장이 없습니다.',
            type: 'alert',
          });
        }
      },
    },
  );
};
