import {useGetGymDetailInfo} from '@entities/gym/queries';
import {GymDetailInfo} from '@entities/gym/ui';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MapRoute} from '@shared/constants';
import {LoadingSpinner} from '@shared/ui';
import React from 'react';

const MapDetailScreen = () => {
  const route = useRoute<RouteProp<MapRoute, 'detail'>>();
  const {id} = route.params;

  const {data, isLoading} = useGetGymDetailInfo(Number(id));

  if (!data || isLoading) return <LoadingSpinner />;

  return <GymDetailInfo data={data} />;
};

export default MapDetailScreen;
