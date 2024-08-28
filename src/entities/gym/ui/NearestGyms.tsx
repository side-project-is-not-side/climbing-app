import React, {useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import DefaultGymCard from './DefaultGymCard';
import {useGetGymsByLocation} from '../queries';
import { GymInfo } from '../api/types';

const NearestGyms = ({setSelected}: {
  setSelected:React.Dispatch<React.SetStateAction<number | undefined>>}) => {
  const {data: gymInfos} = useGetGymsByLocation();

  const nearestData = gymInfos?.[0].slice(0, 2);

  const renderItem = useCallback(
    ({item}: {item: GymInfo}) => (
      <DefaultGymCard item={item} onClick={(id) => () => {setSelected(id)}} />
    ),
    [nearestData],
  );

  return (
    <View className="flex-1">
      <Text className="font-header-1 text-neutral-50 mb-5">
        내 근처 암장을 찾아보세요🔥
      </Text>

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
    rowGap:12,
  },
});

export default NearestGyms;
