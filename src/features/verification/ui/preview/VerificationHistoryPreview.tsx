'use client';

import {LocationHistoryPreview} from './LocationHistoryPreview';
import {PictureHistoryPreview} from './PictureHistoryPreview';
import {Activity, ActivityLocation, ActivityPicture, ActivityType} from '@entities/challenge/type';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CHALLENGE_ROUTES, ChallengeRoute} from '@shared/constants';
import React from 'react';
import {Dimensions, Text, View} from 'react-native';

type Props = {
  challengeId: number;
  challengeTitle: string;
  activityType: ActivityType;
  isCompleted: boolean;
  recentActivities: Activity[];
};

const {width} = Dimensions.get('screen');

const Preview = ({
  recentActivities,
  activityType,
  handlePressMoreHistory,
}: Pick<Props, 'recentActivities' | 'activityType'> & {handlePressMoreHistory: () => void}) => {
  if (!recentActivities.length) {
    return (
      <View
        style={{
          width: width - 40,
          height: (width - 48) / 3,
          borderWidth: 1,
          borderRadius: 10,
          borderStyle: 'dashed',
          borderColor: '#55575B',
          justifyContent: 'center',
        }}>
        <Text className="text-[#55575B] text-center">현재 진행중인 도전이 없어요.</Text>
        <Text className="text-[#55575B] text-center">근처 암장에 가서 그랩을 불태워보자!</Text>
      </View>
    );
  }

  if (activityType === 'LOCATION') {
    return (
      <LocationHistoryPreview
        recentActivities={recentActivities as ActivityLocation[]}
        handlePressMoreHistory={handlePressMoreHistory}
      />
    );
  }

  if (activityType === 'PICTURE') {
    return (
      <PictureHistoryPreview
        recentActivities={recentActivities as ActivityPicture[]}
        handlePressMoreHistory={handlePressMoreHistory}
      />
    );
  }

  return null;
};

const VerificationHistoryPreview = ({
  challengeId,
  challengeTitle,
  activityType,
  isCompleted,
  recentActivities,
}: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const handlePressMoreHistory = () => {
    if (!challengeId) return;
    navigation.navigate(CHALLENGE_ROUTES.VERIFICATION_HISTORY, {
      challengeId,
      challengeTitle,
      activityType,
      isCompleted,
    });
  };

  return (
    <View className="my-[30px]">
      <Text className="mb-[20px] text-white text-sm font-bold">인증 기록</Text>
      <View className="flex-row items-stretch gap-2">
        <Preview
          recentActivities={recentActivities}
          activityType={activityType}
          handlePressMoreHistory={handlePressMoreHistory}
        />
      </View>
    </View>
  );
};

export default VerificationHistoryPreview;
