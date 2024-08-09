import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useLayoutEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CHALLENGE_ROUTES, ChallengeRoute, colors} from '../shared/constants';
import {formatKST} from '../shared/utils';

type ScreenProps = NativeStackScreenProps<ChallengeRoute, 'verify_complete'>;

const VerifyCompleteScreen = ({route, navigation}: ScreenProps) => {
  const image = route.params.image;
  const challengeId = route.params.challengeId;


  const pageOut = () => {
    setTimeout(() => {
      navigation.navigate(CHALLENGE_ROUTES.CHALLENGE_DETAIL, {
        challengeId
      });
    }, 1500);
  }
  return (
    <View className='items-center justify-center flex-1 gap-5'>
      <Image source={image} className='w-[160px] h-[160px] rounded-lg' resizeMode='cover' onLoadEnd={pageOut} />
      <View className='items-center justify-center gap-1'>
        <Text className='text-lg font-bold text-white'>인증 완료</Text>
        <Text className='text-sm text-white'>
          {formatKST(new Date())}
        </Text>
        <Text className='text-base text-neutral-400'>계속 도전해보자구 부리!</Text>
      </View>
    </View>
  );
};

export default VerifyCompleteScreen;

