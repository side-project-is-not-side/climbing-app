import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import {Badge} from '../../../shared';
import ScrollViewCarousel from '../../../shared/ui/ScrollViewCarousel';

const Progress = () => {
  const activityCount = 13;
  const successCount = 20;
  const pages = Math.ceil(successCount / 10);

  return (
    <>
      <View style={styles.titleContainer}>
        <Text>진행률</Text>
        <Badge text={`13/20`} />
      </View>
      <View>
        <ScrollViewCarousel
          data={Array(pages)
            .fill(0)
            .map((v, i) => i)}
          keyExtractor={data => data}
          render={(_, page) => {
            const isInProgressPage = page === 0 && activityCount % 10 !== 0;
            const progressGrapCount = activityCount % 10;

            const complatedPageSize =
              Math.floor(activityCount / 10) - Number(activityCount % 10 === 0);
            const isComplated = page <= complatedPageSize;
            return (
              <View style={styles.progressIcons}>
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <View key={index} style={{width: 40, height: 40}}>
                      <Image
                        source={
                          isInProgressPage
                            ? index < progressGrapCount
                              ? require('../../../../assets/icons/hold_grab.png')
                              : require('../../../../assets/icons/hold_empty.png')
                            : isComplated
                            ? require('../../../../assets/icons/hold_grab.png')
                            : require('../../../../assets/icons/hold_empty.png')
                        }
                        alt="progress"
                        width={40}
                        height={40}
                      />
                    </View>
                  ))}
              </View>
            );
          }}
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
