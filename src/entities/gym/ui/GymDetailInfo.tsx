import {GetGymDetailResponse} from '../api/types';
import BusinessHours from './BusinessHours';
import LocationCard from './LocationCard';
import SocialLink from './SocialLink';
import CurrentGymCard from '@entities/map/ui/CurrentGymCard';
import {Icon} from '@shared/ui';
import React from 'react';
import {ScrollView, Text, View} from 'react-native';

function GymDetailInfo({data}: {data: GetGymDetailResponse}) {
  const {
    name,
    tags,
    roadNameAddress,
    thumbnailImageUrl,
    description,
    distance,
    businessHours,
    location,
    instagram,
    naverMap,
    notice,
    id,
  } = data;
  const {latitude, longitude} = location;

  return (
    <ScrollView className="bg-grayscale-black p-4">
      <CurrentGymCard
        id={id}
        name={name}
        tags={tags}
        roadNameAddress={roadNameAddress}
        thumbnailImageUrl={thumbnailImageUrl}
        distance={distance}
      />

      <View className="flex flex-col mt-[58px] pb-[94px]">
        <View className="flex flex-col mb-[30px]">
          <Text className="text-white font-header-3 mb-[10px]">암장 정보</Text>
          <Text className="text-neutral-400 font-text-2">{description}</Text>
        </View>

        <View className="flex-col mb-[30px]">
          <Text className="text-white font-header-3 mb-[10px]">영업 시간</Text>

          <BusinessHours businessHours={businessHours} />

          <View className="flex-row items-center py-[10px] px-3 rounded-[4px] bg-red-600 mb-5 shrink break-keep">
            <Icon name="LoudSpeaker" color="#fff" />
            <Text className="font-text-2 text-white overflow-hidden flex-1 break-keep ml-[10px]">
              {notice || '셋팅 요일에 따라 영업 시간이 달라질 수 있습니다.'}
            </Text>
          </View>
        </View>

        <View className="mb-5">
          <View className="mb-[20px]">
            <Text className="font-header-3 text-white mb-[10px]">암장 위치</Text>
            <LocationCard latitude={latitude} longitude={longitude} />
          </View>
          <View className="flex-row items-start gap-x-1 flex-wrap">
            <Icon name="Location" size={16} />
            <Text className="text-neutral-400 text-sm font-normal leading-4">{roadNameAddress}</Text>
          </View>
        </View>

        <SocialLink instagram={instagram} naverMap={naverMap} />
      </View>
    </ScrollView>
  );
}

export default GymDetailInfo;
