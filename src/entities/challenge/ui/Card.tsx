'use client';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Challenge} from '../type';
import {useNavigation} from '@react-navigation/native';
import {
  CHALLENGE_ROUTES,
  ChallengeRoute,
  colors,
} from '../../../shared/constants';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Badge} from '../../../shared/ui';

const activityTypes = {
  PICTURE: '사진 챌린지',
  VIDEO: '레벨도전',
  LOCATION: '암장도전',
};

const Card = ({challenge}: {challenge: Challenge}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const handlePressCard = () => {
    navigation.navigate(CHALLENGE_ROUTES.CHALLENGE_DETAIL, {
      challengeId: challenge.id,
    });
  };

  return (
    <Pressable className='flex-row gap-4 py-5 pl-5 pr-4 my-[5px] mx-auto bg-neutral-700 rounded-2xl' onPress={handlePressCard}>
      <Image
        source={require('../../../../assets/images/fire_full.png')}
        alt="progress fire image"
        width={100}
        height={100}
        resizeMode='contain'
        className='w-[100px] h-[100px]'
      />
      <View className='flex-1'>
        <Text className='mb-1 text-xs font-bold text-primary-400'>{activityTypes[challenge.activityType]}</Text>
        <Text className='text-lg font-bold text-white' numberOfLines={1} ellipsizeMode="tail">
          {challenge.title}
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail" className='text-neutral-400'>
          {challenge.summary}
        </Text>
        <View className='flex-row justify-end'>
          <Badge
            text={`${challenge.activityCount}/${challenge.successCount}`}
            className='mt-2'
          />
        </View>
      </View>
    </Pressable>
  );
};

export default Card;