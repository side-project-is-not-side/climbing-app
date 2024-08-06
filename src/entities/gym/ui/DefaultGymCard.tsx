import React from 'react';
import {Image, View, Text} from 'react-native';
import Chips from './Chips';
import { GymInfo } from '../api/types';

type Props = {
  item: GymInfo
  ;
  onClick: (id: number) => () => void;
};

const DefaultGymCard = ({item, onClick}: Props) => {
  const {
    id,
    name,
    thumbnailImageUrl,
    roadNameAddress,
    lotNumberAddress,
    distance,
    tags,
  } = item;

  return (
    <View className="flex-row self-stretch p-5 items-center gap-x-[14px] rounded-[20px] bg-gray-700">
      <View className="w-[72px] h-[72px] overflow-hidden rounded-[10px] flex-shrink-0">
        <Image source={{uri: thumbnailImageUrl}} width={72} height={72} />
      </View>

      <View className="self-stretch flex-col items-start gap-y-2">
        <View className="flex-col gap-y-1 self-stretch">
          <Text className="self-stretch text-white text-base font-bold">
            {name}
          </Text>

          <View className="flex-row items-center gap-x-[10px] shrink break-keep">
            <Text className="text-white text-sm">{distance}m | </Text>
            <Text className="overflow-hidden text-neutral-400 text-sm break-keep">
              string
            </Text>
          </View>

          <Chips chips={tags} />
        </View>
      </View>
    </View>
  );
};

export default DefaultGymCard;
