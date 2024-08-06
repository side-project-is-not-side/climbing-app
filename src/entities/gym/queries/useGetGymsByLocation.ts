
import { DEFAULT_ZOOM } from '@entities/map/constants/location';
import { useCurrentLocation } from '@entities/map/hooks';
import { getUrlWithoutHost } from '@shared/utils';
import useSWRInfinite, {SWRInfiniteKeyLoader} from 'swr/infinite';
import { GymInfo } from '../api/types';

export const useGetGymsByLocation = () => {
  const {
    currentLocation: {latitude, longitude},
  } = useCurrentLocation(DEFAULT_ZOOM);

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;

    const url = getUrlWithoutHost('/v1/gyms/order-by-location', {
      latitude: String(latitude),
      longitude: String(longitude),
      page: String(pageIndex),
      limit: '10',
    });
    return url;
  };

  return useSWRInfinite<GymInfo[]>(getKey, {revalidateFirstPage: false});
};
