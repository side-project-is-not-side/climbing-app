import React from 'react';
import {Text, View} from 'react-native';

import {ProgressSlide} from './';

import {Badge, ScrollViewCarousel} from '../../../shared/ui';

const Progress = ({
  // activityCount = 0,
  // successCount = 10,
}: {
  activityCount?: number;
  successCount?: number;
}) => {

  const activityCount = 12
  const successCount = 30
  const pages = Math.ceil(successCount / 10);

  return (
    <>
      <View className='flex-row justify-between items-center mb-[10px]'>
        <Text className='text-sm font-bold text-white'>진행률</Text>
        <Badge text={`${activityCount}/${successCount}`} />
      </View>
      <ScrollViewCarousel
        data={Array(pages)
          .fill(0)
          .map((_, i) => i)}
        keyExtractor={data => data}
        render={(_, index) => 
          <ProgressSlide page={index} activityCount={activityCount} />}
      />
    </>
  );
};

export default Progress;

