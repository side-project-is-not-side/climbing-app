import {GymInfo} from '../api/types';
import {useGetGymsByLocation} from '../queries';
import DefaultGymCard from './DefaultGymCard';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const NearestGyms = ({onClick}: {onClick: (id: number) => () => void}) => {
  const {data: gymInfos} = useGetGymsByLocation();

  const nearestData = gymInfos?.[0].slice(0, 2);

  const renderItem = useCallback(
    ({item}: {item: GymInfo}) => <DefaultGymCard item={item} onClick={onClick} />,
    [nearestData],
  );

  return (
    <View className="flex-1">
      <Text className="font-header-1 text-neutral-50 mb-5">내 근처 암장을 찾아보세요🔥</Text>

      <BottomSheetFlatList
        contentContainerStyle={styles.contentContainer}
        data={nearestData}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    rowGap: 12,
  },
});

export default NearestGyms;
