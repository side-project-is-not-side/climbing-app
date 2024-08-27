'use client';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SquareImage} from '../../../shared/ui';
import {CHALLENGE_ROUTES, ChallengeRoute, colors} from '../../../shared/constants';

import { Activity } from '../type';

type Props = {
  challengeId?: number, 
  challengeTitle: string, 
  recentActivities: Activity[]
}

const {width} = Dimensions.get('screen')

const VerificationHistoryPreview = ({challengeId, challengeTitle, recentActivities} : Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const handlePressMoreHistory = (seeMore: boolean, activity: Activity) => {
    if(!challengeId) return
    seeMore ? navigation.navigate(CHALLENGE_ROUTES.VERIFICATION_HISTORY, {challengeId, challengeTitle})
    : navigation.navigate(CHALLENGE_ROUTES.VERIFICATION_DETAIL, {challengeTitle, imageUrl: activity.imageUrl, createdAt: activity.createdAt})
  };

  return (
    <View className='my-[30px]'>
      <Text className='mb-[20px] text-white text-sm font-bold'>인증 기록</Text>
      <View className='flex-row items-stretch gap-2'>
        {recentActivities.length ? recentActivities.slice(0,3).map((activity, i) => (
            <Pressable key={`${activity.imageUrl}_${i}`} className=' rounded-[10px] overflow-hidden bg-neutral-700' onPress={() => handlePressMoreHistory(i === 2, activity)}>
              <SquareImage
                source={{uri: activity.imageUrl}}
                alt={'verification photo'}
                style={{width: (width - 48)/3, height: (width - 48)/3}} className='relative flex-1 overflow-hidden '
                resizeMode='cover'
              />
              {i === 2 && (
                <View className='absolute justify-center items-center top-0 left-0 w-full h-full bg-[#0007]'>
                  <Text className='text-white'>더보기</Text>
                </View>
              )}
            </Pressable>
          )) : (
            <View style={{
                width: (width - 40), 
                height: (width - 48)/3,
                borderWidth: 1,
                borderRadius: 10,
                borderStyle: 'dashed',
                borderColor: '#55575B',
                justifyContent: 'center'
              }}>
              <Text className='text-[#55575B] text-center'>현재 진행중인 도전이 없어요.</Text>
              <Text className='text-[#55575B] text-center'>근처 암장에 가서 그랩을 불태워보자!</Text>
            </View>
          )
        }
      </View>
    </View>
  );
};

export default VerificationHistoryPreview;