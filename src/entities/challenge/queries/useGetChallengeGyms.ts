import {ChallengeGym} from '../type';
import {Alert} from 'react-native';
import useSWR from 'swr';

export const useGetChallengeGyms = (id: number) => {
  return useSWR<ChallengeGym[]>(`/v1/challenges/${id}/gyms`, null, {
    onSuccess: data => {
      if (data.every(gym => !gym.canChanllenge)) {
        Alert.alert('주변에 인증 가능한 암장이 없습니다.');
      }
    },
  });
};
