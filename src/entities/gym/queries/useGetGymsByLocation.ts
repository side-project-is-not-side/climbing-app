import {GymInfo} from '../api/types';
import {useLocationStore} from '@entities/location';
import {getUrlWithoutHost} from '@shared/utils';
import useSWRInfinite, {SWRInfiniteKeyLoader} from 'swr/infinite';

export const useGetGymsByLocation = () => {
  const {currentLocation} = useLocationStore();

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;

    if (!currentLocation) return null;

    const url = getUrlWithoutHost('/v1/gyms/order-by-location', {
      latitude: String(currentLocation.latitude),
      longitude: String(currentLocation.longitude),
      page: String(pageIndex),
      limit: '10',
    });
    return url;
  };

  return useSWRInfinite<GymInfo[]>(getKey, {
    revalidateOnFocus: false,
  });
};
