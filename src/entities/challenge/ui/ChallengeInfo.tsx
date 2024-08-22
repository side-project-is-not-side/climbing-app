import React from 'react';
import {Dimensions, Image, Text, View} from 'react-native';

import {ChallengeDetail} from '../type';
import { ProgressChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';

const {width} = Dimensions.get('screen')

const activityTypes = {
  PICTURE: '사진 챌린지',
  VIDEO: '레벨도전',
  LOCATION: '암장도전',
};

const ChallengeInfo = ({challenge}: {challenge?: ChallengeDetail}) => {
  const activityCount = 4
  const successCount = 30
  const progress = (activityCount / successCount) * 100
  const chartConfig: AbstractChartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => {
      if(opacity < 0.5) {
        return `#333539`
      } else {
        return `#FF5544`
      }
    },
  };

  return (
    <>
      <View className='relative h-[300px] justify-center items-center'>
        <Image
          source={require('../../../../assets/images/buri_v4_inactive.png')}
          alt="challenge progress image"
          className='opacity-30 w-[240px] ml-4'
          resizeMode='contain'
          blurRadius={4} 
        />
        <View className={`absolute`}>
          <ProgressChart
            data={{
              labels: ["Swim"],
              data: [progress / 100]
            }}
            width={300}
            height={300}
            strokeWidth={14}
            radius={100}
            chartConfig={chartConfig}
            hideLegend={true}
          />
        </View>
        <View className='absolute bg-[#9ca3af22] w-[186px] h-[186px] rounded-full justify-center items-center'>
          <Text className='text-gray-400'>진행률</Text>
          <Text className='mb-2 text-[40px] font-black text-primary-400'>{activityCount}/{successCount}</Text>
          <Text className='text-white'>뱃지 획득까지 {successCount-activityCount}개</Text>
        </View>
      </View>
      <View className='min-h-[100px] my-5'>
        <Text className='text-xs font-bold text-center text-primary-400'>
          {challenge && activityTypes[challenge.activityType]}
        </Text>
        <Text className='my-1 text-2xl font-bold leading-9 text-center text-white'>{challenge?.title}</Text>
        <Text className='text-center text-neutral-400'>{challenge?.description}</Text>
      </View>
    </>
  );
};

export default ChallengeInfo;