import {ActivityPicture} from '@entities/challenge/type';
import {SquareImage} from '@shared/ui';
import React from 'react';
import {Dimensions, Pressable, Text, View} from 'react-native';

type Props = {
  recentActivities: ActivityPicture[];
  handlePressMoreHistory: () => void;
};

const {width} = Dimensions.get('screen');

export const PictureHistoryPreview = ({recentActivities, handlePressMoreHistory}: Props) => {
  return recentActivities.slice(0, 3).map((activity, i) => (
    <Pressable
      key={`${activity.id}_${i}`}
      className=" rounded-[10px] overflow-hidden bg-neutral-700 mx-1"
      onPress={() => handlePressMoreHistory()}>
      <SquareImage
        source={{uri: activity.imageUrl}}
        alt={'verification photo'}
        style={{width: (width - 48) / 3, height: (width - 48) / 3}}
        className="relative flex-1 overflow-hidden "
        resizeMode="cover"
      />
      {i === 2 && (
        <View className="absolute justify-center items-center top-0 left-0 w-full h-full bg-[#0007]">
          <Text className="text-white">더보기</Text>
        </View>
      )}
    </Pressable>
  ));
};
