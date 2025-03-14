import {GetGymDetailResponse} from '../api/types';
import {CurrentLocation, useLocationStore} from '@entities/location';
import {getUrlWithoutHost} from '@shared/utils';
import {useState} from 'react';
import useSWR from 'swr';

export const useGetGymDetailInfo = (id?: number | null) => {
  const {currentLocation} = useLocationStore();

  const [location] = useState<CurrentLocation>(currentLocation);

  const url = getUrlWithoutHost(`/v1/gyms/${id}`, {
    latitude: String(location.latitude),
    longitude: String(location.longitude),
  });
  return useSWR<GetGymDetailResponse>(id ? url : null, {
    keepPreviousData: true,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
};
