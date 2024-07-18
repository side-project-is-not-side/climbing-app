import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ProgressSlide} from '.';

import {Badge, ScrollViewCarousel} from '../../../shared/ui';

const Progress = () => {
  const activityCount = 13;
  const successCount = 20;
  const pages = Math.ceil(successCount / 10);

  return (
    <>
      <View style={styles.titleContainer}>
        <Text>진행률</Text>
        <Badge text={`${activityCount}/${successCount}`} />
      </View>
      <View>
        <ScrollViewCarousel
          data={Array(pages)
            .fill(0)
            .map((_, i) => i)}
          keyExtractor={data => data}
          render={(_, index) => (
            <ProgressSlide page={index} activityCount={activityCount} />
          )}
        />
      </View>
    </>
  );
};

export default Progress;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressIcons: {
    gap: 22,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 35,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#222',
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  indicator: {},
  indicatorActive: {},
});
