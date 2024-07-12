import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Card} from '.';
import {Challenge} from '../type';

const challengeList: Challenge[] = [
  {
    id: 1,
    type: 'climbing',
    title: '암장원정대-1',
    description: '암장 이곳저곳을 돌아보세요!1',
    solved: 3,
    total: 10,
  },
  {
    id: 2,
    type: 'level',
    title: '암장원정-2대',
    description: '암장 이곳저곳을 돌아보세요!2',
    solved: 5,
    total: 10,
  },
  {
    id: 3,
    type: 'climbing',
    title: '암장원정대-3',
    description: '암장 이곳저곳을 돌아보세요!3',
    solved: 1,
    total: 10,
  },
  {
    id: 4,
    type: 'level',
    title: '암장원정-4대',
    description: '암장 이곳저곳을 돌아보세요!4',
    solved: 4,
    total: 10,
  },
  {
    id: 5,
    type: 'climbing',
    title: '암장원정대-5',
    description: '암장 이곳저곳을 돌아보세요!5',
    solved: 10,
    total: 10,
  },
  {
    id: 6,
    type: 'climbing',
    title: '암장원정대-6',
    description: '암장 이곳저곳을 돌아보세요!6',
    solved: 3,
    total: 10,
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
