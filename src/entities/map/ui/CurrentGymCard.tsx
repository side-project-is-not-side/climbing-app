import { useGetGymDetailInfo } from '@entities/gym/queries';
import Chips from '@entities/gym/ui/Chips';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MAP_ROUTES, MapRoute } from '@shared/constants';
import { LoadingSpinner } from '@shared/ui';
import React from 'react';



import { Image, Text, TouchableOpacity, View } from 'react-native';

function CurrentGymCard({id}:{id:number}) {
  const navigation = useNavigation<NativeStackNavigationProp<MapRoute>>();


  const { isLoading, data } = useGetGymDetailInfo(id);

  if (isLoading || !data) return <LoadingSpinner />

  const {thumbnailImageUrl,name,distance,roadNameAddress,tags} = data;

  const onPress = () => {
    navigation.navigate(MAP_ROUTES.DETAIL, {id})
  }
  return (
    <View>
      <Text className="font-header-1 text-white mb-5">
        암장 정보
      </Text>

      <TouchableOpacity onPress={onPress}>
        <View className="relative overflow-hidden w-full h-[156px] rounded-[10px] mb-5">
          <Image source={{uri:thumbnailImageUrl}} alt={name} height={156} />
        </View>

        <View className="self-stretch flex-col items-start gap-y-2">
          <View className="flex-col gap-y-1 self-stretch">
            <Text className="self-stretch text-white text-base font-bold">
              {name}
            </Text>

            <View className="flex-row items-center gap-x-[10px] shrink break-keep mb-[10px]">
              <Text className="text-white text-sm">{distance}m</Text>
              <Text className="text-white text-sm"> | </Text>
              <Text className="overflow-hidden flex-1 text-neutral-400 text-sm break-keep">
                {roadNameAddress}
              </Text>
            </View>

            <Chips chips={tags} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default CurrentGymCard;
