import {GymInfo} from '../api/types';
import {useLocationStore} from '@entities/location';
import {DEFAULT_ZOOM} from '@entities/map/constants/location';
import {useCurrentLocation} from '@entities/map/hooks';
import {getUrlWithoutHost} from '@shared/utils';
import {useState} from 'react';
import useSWRInfinite, {SWRInfiniteKeyLoader} from 'swr/infinite';

export const useGetGymsByLocation = () => {
  const {currentLocation} = useLocationStore();

  const [location] = useState(currentLocation);

  const getKey: SWRInfiniteKeyLoader = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null;

    const url = getUrlWithoutHost('/v1/gyms/order-by-location', {
      latitude: String(location.latitude),
      longitude: String(location.longitude),
      page: String(pageIndex),
      limit: '10',
    });
    return url;
  };

  return useSWRInfinite<GymInfo[]>(getKey, {
    revalidateFirstPage: false,
    revalidateOnFocus: false,
    revalidateIfStale: false,
    revalidateOnReconnect: false,
  });
};
