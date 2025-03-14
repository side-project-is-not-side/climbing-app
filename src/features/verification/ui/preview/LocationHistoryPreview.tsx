import {ActivityLocation} from '@entities/challenge/type';
import React from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';

const {width} = Dimensions.get('screen');

type Props = {
  recentActivities: ActivityLocation[];
  handlePressMoreHistory: () => void;
};

export const LocationHistoryPreview = ({recentActivities, handlePressMoreHistory}: Props) => {
  return recentActivities.slice(0, 3).map((activity, i) => (
    <Pressable
      key={`${activity.id}_${i}`}
      className="rounded-[10px] overflow-hidden bg-neutral-700 items-center justify-center gap-1 p-2"
      onPress={() => handlePressMoreHistory()}
      style={{width: (width - 48) / 3, height: (width - 48) / 3}}>
      <Image
        source={require('../../../../../assets/images/buri_pin.png')}
        alt={'Verification location Icon'}
        className=""
      />
      <View className="h-8 items-center justify-center">
        {i === 2 ? (
          <Text className="text-xs text-grayscale-400">더보기</Text>
        ) : (
          <Text className="text-xs text-grayscale-400" numberOfLines={2} ellipsizeMode="tail">
            {activity.gymName}
          </Text>
        )}
      </View>
    </Pressable>
  ));
};
