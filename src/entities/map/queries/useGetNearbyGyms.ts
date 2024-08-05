import useSWR from 'swr';
import {Bounds, GetAroundBoulderingGymResponse} from '../api/types';
import {getNearByBoulderingGyms} from '../api';

const ENDPOINT = '/v1/gyms/map';

export const useGetNearbyGyms = (bounds: Bounds) => {
  const params = new URLSearchParams(bounds);

  return useSWR<GetAroundBoulderingGymResponse>(
    bounds ? `${ENDPOINT}?${params}` : null,
    () => getNearByBoulderingGyms(bounds),
    {
      keepPreviousData: true,
    },
  );
};
