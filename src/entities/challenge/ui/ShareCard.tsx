import React from 'react';
import {Image, Text, View} from 'react-native';

const ShareCard = () => {
  return (
    <View className="bg-neutral-700 rounded-[20px] px-[20px] py-[30px] justify-center items-center ">
      <View className="gap-[6px]">
        <Text className="text-center text-primary-400">Challenge complleted!</Text>
        <Text className="text-center text-white font-bold text-2xl">챌린지 제목입니당</Text>
      </View>
      <View className="justify-center items-center gap-4 my-4">
        <Image source={require('/assets/images/buri_v3.png')} className="w-[182px] h-[182px]" />
        <View className="py-4 gap-0.5">
          <Text className="text-center text-white font-bold">유저 닉네임입니당</Text>
          <Text className="text-center text-white opacity-50 text-sm">2000.12.12 - 2999.12.12</Text>
        </View>
      </View>
    </View>
  );
};

export default ShareCard;
