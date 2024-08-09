import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ChallengeDetail} from '../type';
import {colors} from '../../../shared/constants';

const activityTypes = {
  PICTURE: '사진 챌린지',
  VIDEO: '레벨도전',
  LOCATION: '암장도전',
};

const ChallengeInfo = ({challenge}: {challenge?: ChallengeDetail}) => {
  return (
    <>
      <View className='h-[200px] justify-center items-center border-neutral-400 border rounded-2xl'>
        <Image
          source={require('../../../../assets/images/fire_full.png')}
          alt="challenge progress image"
        />
      </View>
      <View className='min-h-[100px] my-5'>
        <Text className='mb-1 text-xs font-bold text-primary-400'>
          {challenge && activityTypes[challenge.activityType]}
        </Text>
        <Text className='text-2xl font-bold leading-9 text-white'>{challenge?.title}</Text>
        <Text className='text-neutral-400'>{challenge?.description}</Text>
      </View>
    </>
  );
};

export default ChallengeInfo;