import {GetGymDetailResponse} from '../api/types';
import {INITIAL_CENTER, ZOOM_LEVEL} from '@entities/map/constants/location';
import {useCurrentLocation} from '@entities/map/hooks';
import {getUrlWithoutHost} from '@shared/utils';
import useSWR from 'swr';

export const useGetGymDetailInfo = (id?: number | null) => {
  const {currentLocation} = useCurrentLocation(ZOOM_LEVEL.시군구);
  const {latitude, longitude} = currentLocation ?? INITIAL_CENTER;

  const url = getUrlWithoutHost(`/v1/gyms/${id}`, {latitude: String(latitude), longitude: String(longitude)});
  return useSWR<GetGymDetailResponse>(id ? url : null, {
    keepPreviousData: true,
  });
};
