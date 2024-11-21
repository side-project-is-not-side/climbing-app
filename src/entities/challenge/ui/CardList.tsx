import {Challenge, ChallengeStatus} from '../type';
import {Card} from './';
import React from 'react';
import {FlatList, StyleSheet} from 'react-native';

const CardList = ({
  data = [],
  tabState,
  handlePaging,
}: {
  data: Challenge[];
  tabState: ChallengeStatus;
  handlePaging: () => void;
}) => {
  return (
    <FlatList
      contentContainerStyle={styles.cardList}
      data={data}
      keyExtractor={item => `${item.id}`}
      renderItem={({item}) => <Card challenge={item} tabState={tabState} />}
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
