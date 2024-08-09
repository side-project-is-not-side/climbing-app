import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {colors} from '../../../shared/constants';

const {width} = Dimensions.get('screen')

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
    <View className='flex-row flex-wrap justify-between w-full h-full p-5 rounded-2xl bg-neutral-700'>
      {Array(10)
        .fill(0)
        .map((_, index) => {
          const isGrab = index < activityCount % 10;
          return (
            <View key={index} style={{width: (width - 80) / 5}} className={`justify-center items-center my-3`}>
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