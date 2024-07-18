import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {Card} from '.';
import {Challenge} from '../type';

const CardList = ({data = []}: {data: Challenge[]}) => {
  return (
    <FlatList
      contentContainerStyle={styles.cardList}
      data={data}
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
