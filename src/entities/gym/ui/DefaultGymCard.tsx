import {GymInfo} from '../api/types';
import Chips from './Chips';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  item: GymInfo;
  onClick: (id: number, location: GymInfo['location']) => () => void;
};

const DefaultGymCard = ({item, onClick}: Props) => {
  const {id, name, thumbnailImageUrl, roadNameAddress, lotNumberAddress, distance, tags, location} = item;

  return (
    <TouchableOpacity
      className="flex-row self-stretch min-w-full p-5 justify-between items-center rounded-[20px] bg-grayscale-700 mx-0"
      onPress={onClick(id, location)}>
      <View className="w-[72px] h-[72px] overflow-hidden rounded-[10px] flex-shrink-0 mr-[14px]">
        <Image source={{uri: thumbnailImageUrl}} width={72} height={72} />
      </View>

      <View className="flex-1 self-stretch flex-col items-start gap-y-2">
        <View className="flex-col gap-y-1 self-stretch">
          <Text className="self-stretch text-white text-base font-bold">{name}</Text>

          <View className="flex-row items-center gap-x-[10px] shrink break-keep mb-[10px]">
            <Text className="text-white text-sm">{distance}m</Text>
            <Text className="text-white text-sm"> | </Text>
            <Text className="overflow-hidden flex-1 text-neutral-400 text-sm break-keep">
              {roadNameAddress ?? lotNumberAddress}
            </Text>
          </View>

          <Chips chips={tags} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default DefaultGymCard;
