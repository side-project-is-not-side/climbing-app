import {useGetGymDetailInfo} from '../queries';
import CurrentGymCard from '@entities/map/ui/CurrentGymCard';
import {LoadingSpinner} from '@shared/ui';
import React from 'react';
import {View} from 'react-native';

const SelectedGymCard = ({id}: {id: number}) => {
  const {isLoading, data} = useGetGymDetailInfo(id);

  if (isLoading || !data) return <LoadingSpinner />;
  const {name, thumbnailImageUrl, roadNameAddress, distance, tags} = data;

  return (
    <View>
      <CurrentGymCard
        id={id}
        name={name}
        thumbnailImageUrl={thumbnailImageUrl}
        roadNameAddress={roadNameAddress}
        distance={distance}
        tags={tags}
      />
    </View>
  );
};

export default SelectedGymCard;
