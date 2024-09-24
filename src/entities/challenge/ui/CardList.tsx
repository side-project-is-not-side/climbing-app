import {Challenge} from '../type';
import {Card} from './';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

const CardList = ({data = [], handlePaging}: {data: Challenge[]; handlePaging: () => void}) => {
  return (
    <FlatList
      contentContainerStyle={styles.cardList}
      data={data}
      keyExtractor={item => `${item.id}`}
      renderItem={({item}) => <Card challenge={item} />}
      onEndReached={handlePaging}
      onEndReachedThreshold={0.05}
      // ListFooterComponent={}
    />
  );
};

export default CardList;

const styles = StyleSheet.create({
  cardList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
