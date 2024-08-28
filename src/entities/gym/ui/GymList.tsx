import {GymInfo} from '../api/types';
import {useGetGymsByLocation} from '../queries';
import DefaultGymCard from './DefaultGymCard';
import React, {useCallback} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

const GymList = ({onClick}: {onClick: (id: number) => () => void}) => {
  const {data: gymInfos, setSize} = useGetGymsByLocation();

  const onEndReached = () => {
    setSize(prev => prev + 1);
  };

  const renderItem = useCallback(
    ({item}: {item: GymInfo}) => (
      <View className="mb-3">
        <DefaultGymCard item={item} onClick={onClick} />
      </View>
    ),
    [gymInfos],
  );

  return (
    <FlatList
      style={styles.contentContainer}
      data={gymInfos?.flat()}
      keyExtractor={item => String(item.id)}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    alignSelf: 'stretch',
  },
});

export default GymList;
