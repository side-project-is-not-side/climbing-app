import {getNearByBoulderingGyms} from '../api';
import {GetAroundBoulderingGymResponse} from '../api/types';
import {Bounds} from '@entities/location';
import useSWR from 'swr';

const ENDPOINT = '/v1/gyms/map';

export const useGetNearbyGyms = (bounds: Bounds | undefined) => {
  const params = new URLSearchParams(bounds);

  return useSWR<GetAroundBoulderingGymResponse>(
    bounds ? `${ENDPOINT}?${params}` : null,
    () => getNearByBoulderingGyms(bounds),
    {
      keepPreviousData: true,
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  );
};
