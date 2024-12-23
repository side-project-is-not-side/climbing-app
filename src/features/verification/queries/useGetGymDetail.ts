import {GetGymDetailResponse, Location} from '@entities/gym/api/types';
import useSWR from 'swr';

export const useGetGymDetail = (id: number, currentLocation: Location) => {
  return useSWR<GetGymDetailResponse>(
    `/v1/gyms/${id}?latitude=${currentLocation.latitude}&longitude=${currentLocation.longitude}`,
  );
};
