import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {TabState, useTab} from '../hooks';

const TABS: {value: TabState; text: string}[] = [
  {value: 'NOT_STARTED', text: '챌린지'},
  {value: 'ONGOING', text: '진행중'},
  {value: 'SUCCESS', text: '완료'},
];

const Tabs = () => {
  const {tabState, handleTabPress} = useTab();
  return (
    <View style={styles.tabContainer}>
      {TABS.map(tab => (
        <Pressable
          key={tab.value}
          style={[styles.tab, tab.value === tabState && styles.tabActive]}
          onPress={() => handleTabPress(tab.value)}>
          <Text
            style={[
              styles.tabText,
              tab.value === tabState && styles.textActive,
            ]}>
            {tab.text}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#777',
  },
  tabText: {
    fontSize: 16,
  },
  textActive: {
    fontWeight: '700',
  },
});
