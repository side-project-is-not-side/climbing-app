import React from 'react';
import { GetGymDetailResponse } from '../api/types';
import CurrentGymCard from '@entities/map/ui/CurrentGymCard';
import BusinessHours from './BusinessHours';
import { Icon } from '@shared/ui';
import LocationCard from './LocationCard';
import { ScrollView, Text, View } from 'react-native';
import SocialLink from './SocialLink';



function GymDetailInfo({ data }: { data: GetGymDetailResponse }) {
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
    id
  } = data;
  const { latitude, longitude } = location;

  return (
    <ScrollView className='bg-black p-4'>
        <CurrentGymCard
          id={id}
          name={name}
          tags={tags}
          roadNameAddress={roadNameAddress}
          thumbnailImageUrl={thumbnailImageUrl}
          distance={distance}
        />

      <View className="border-[5px] border-grayscale-700 mb-[30px]" />

      <View className="flex flex-col gap-y-[30px]">
        <View className="flex flex-col gap-y-[10px]">
          <Text className="text-white font-header-3">암장 정보</Text>
          <Text className="text-neutral-400 font-text-2">{description}</Text>
        </View>

        <View className="flex-col">
          <Text className="text-white font-header-3 mb-[10px]">영업 시간</Text>

          <BusinessHours businessHours={businessHours} />

          <View className="flex items-center gap-x-2 py-[10px] px-3 rounded-[4px] bg-red-600 mb-6">
            <Icon name="LoudSpeaker" color="#fff" />
            <Text className="font-text-2 text-white">
              {notice ?? '셋팅 요일에 따라 영업 시간이 달라질 수 있습니다.'}
            </Text>
          </View>
        </View>

        <View>
          <View className="mb-[20px]">
            <Text className="font-header-3 text-white mb-[10px]">암장 위치</Text>
            <LocationCard latitude={latitude} longitude={longitude} />
          </View>
          <View className="flex items-start gap-x-1 flex-wrap">
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
