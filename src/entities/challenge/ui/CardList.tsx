import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Card} from '.';
import {Challenge} from '../type';

const challengeList: Challenge[] = [
  {
    id: 1,
    activityType: 'PICTURE',
    title: '암장원정대-1',
    summary: '암장 이곳저곳을 돌아보세요!1',
    activityCount: 3,
    successCount: 10,
    imageUrl: {
      black: 'string',
      color: 'string',
    },
  },
  {
    id: 2,
    activityType: 'LOCATION',
    title: '암장원정-2대',
    summary: '암장 이곳저곳을 돌아보세요!2',
    activityCount: 5,
    successCount: 10,
    imageUrl: {
      black: 'string',
      color: 'string',
    },
  },
  {
    id: 3,
    activityType: 'PICTURE',
    title: '암장원정대-3',
    summary: '암장 이곳저곳을 돌아보세요!3',
    activityCount: 1,
    successCount: 10,
    imageUrl: {
      black: 'string',
      color: 'string',
    },
  },
  {
    id: 4,
    activityType: 'VIDEO',
    title: '암장원정-4대',
    summary: '암장 이곳저곳을 돌아보세요!4',
    activityCount: 4,
    successCount: 10,
    imageUrl: {
      black: 'string',
      color: 'string',
    },
  },
  {
    id: 5,
    activityType: 'PICTURE',
    title: '암장원정대-5',
    summary: '암장 이곳저곳을 돌아보세요!5',
    activityCount: 10,
    successCount: 10,
    imageUrl: {
      black: 'string',
      color: 'string',
    },
  },
  {
    id: 6,
    activityType: 'LOCATION',
    title: '암장원정대-6',
    summary: '암장 이곳저곳을 돌아보세요!6',
    activityCount: 3,
    successCount: 10,
    imageUrl: {
      black: 'string',
      color: 'string',
    },
  },
];

const CardList = () => {
  return (
    <FlatList
      contentContainerStyle={styles.cardList}
      data={challengeList}
      keyExtractor={item => `${item.id}`}
      renderItem={({item}) => <Card challenge={item} />}
    />
  );
};

export default CardList;

const styles = StyleSheet.create({
  cardList: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
});
