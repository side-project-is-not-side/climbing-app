import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {ProgressSlide} from '.';

import {Badge, ScrollViewCarousel} from '../../../shared/ui';
import {colors} from '../../../shared/constants';

const Progress = ({}: // activityCount,
// successCount,
{
  activityCount: number;
  successCount: number;
}) => {
  const activityCount = 5;
  const successCount = 20;
  const pages = Math.ceil(successCount / 10);

  return (
    <>
      <View style={styles.progressInfo}>
        <Text style={styles.title}>진행률</Text>
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
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: colors.black,
    fontSize: 14,
    fontWeight: '700',
  },
});
