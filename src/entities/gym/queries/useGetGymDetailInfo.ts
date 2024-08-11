import { getUrlWithoutHost } from '@shared/utils';
import useSWR from 'swr';
import { GetGymDetailResponse } from '../api/types';
import { INITIAL_CENTER, ZOOM_LEVEL } from '@entities/map/constants/location';
import { useCurrentLocation } from '@entities/map/hooks';

export const useGetGymDetailInfo = (id: number) => {
  const { currentLocation } = useCurrentLocation(ZOOM_LEVEL.시군구);
  const {latitude, longitude} = currentLocation ?? INITIAL_CENTER;

  const url = getUrlWithoutHost(`/v1/gyms/${id}`, { latitude: String(latitude), longitude: String(longitude) });
  return useSWR<GetGymDetailResponse>(url, {
    keepPreviousData: true,
  });
};
