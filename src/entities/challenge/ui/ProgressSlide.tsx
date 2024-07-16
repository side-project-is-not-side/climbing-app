import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

const ProgressSlide = ({
  page,
  activityCount,
}: {
  page: number;
  activityCount: number;
}) => {
  const grabIconSource = require('../../../../assets/icons/hold_grab.png');
  const emptyIconSource = require('../../../../assets/icons/hold_empty.png');

  const isInProgressPage = page === 0 && activityCount % 10 !== 0;
  const isComplatedPage =
    page <= Math.floor(activityCount / 10) - Number(activityCount % 10 === 0);

  return (
    <View style={styles.progressIcons}>
      {Array(10)
        .fill(0)
        .map((_, index) => {
          const isGrab = index < activityCount % 10;
          return (
            <View key={index} style={styles.grabIcon}>
              <Image
                source={
                  isInProgressPage
                    ? isGrab
                      ? grabIconSource
                      : emptyIconSource
                    : isComplatedPage
                    ? grabIconSource
                    : emptyIconSource
                }
                alt="progress"
                width={40}
                height={40}
              />
            </View>
          );
        })}
    </View>
  );
};

export default ProgressSlide;

const styles = StyleSheet.create({
  progressIcons: {
    gap: 22,
    height: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 35,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#222',
  },
  grabIcon: {
    width: 40,
    height: 40,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  indicator: {},
  indicatorActive: {},
});
