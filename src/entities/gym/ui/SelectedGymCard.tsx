import React from 'react'
import { useGetGymDetailInfo } from '../queries';
import { LoadingSpinner } from '@shared/ui';
import CurrentGymCard from '@entities/map/ui/CurrentGymCard';
import { Text, View } from 'react-native';

const SelectedGymCard = ({ id }: { id: number }) => {
  const { isLoading, data } = useGetGymDetailInfo(id);


  if (isLoading || !data) return <LoadingSpinner />;
  const { name, thumbnailImageUrl, roadNameAddress, distance, tags } = data;

  return (
    <View>

      <Text className="font-header-1 text-white mb-5">
        암장 정보
      </Text>

      <CurrentGymCard
        id={id}
        name={name}
        thumbnailImageUrl={thumbnailImageUrl}
        roadNameAddress={roadNameAddress}
        distance={distance}
        tags={tags}
      />
    </View>
  )
}

export default SelectedGymCard