import {ChallengeGym} from '@entities/challenge';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';

interface Props {
  gyms: ChallengeGym[] | undefined;
  setSelectedGym: React.Dispatch<React.SetStateAction<ChallengeGym | null>>;
}

const GymListBottomSheet = ({gyms, setSelectedGym}: Props) => {
  const selectGym = (gym: ChallengeGym) => {
    gym.canChallenge && setSelectedGym(gym);
  };

  return (
    <>
      <View className="px-5">
        <Text className="text-white font-bold text-lg mb-5">인증 가능한 암장🔥</Text>
      </View>
      {gyms && (
        <BottomSheetFlatList
          contentContainerStyle={{
            paddingHorizontal: 20,
          }}
          data={gyms}
          keyExtractor={(item, idx) => `${item.id}_${idx}`}
          renderItem={({item}) => (
            <Pressable
              className={`${
                item.canChallenge ? 'bg-primary-400' : 'bg-grayscale-700'
              } rounded-2xl my-2 p-5 flex-row items-center`}
              onPress={() => selectGym(item)}>
              <Image src={item.thumbnailImageUrl} className="w-[72px] h-[72px] bg-grayscale-600 rounded-lg mr-5" />
              <View className="shrink">
                <Text className="text-white font-bold text-base">{item.name}</Text>
                <View className="mb-2">
                  <Text className="text-white text-sm" numberOfLines={1} ellipsizeMode="tail">
                    {item.distance}m | {item.address}
                  </Text>
                </View>
                <View className="flex-row gap-1">
                  {item.tags.map(tag => (
                    <View
                      className={`${
                        item.canChallenge ? 'bg-white' : 'bg-grayscale-600'
                      } justify-center items-center px-2 py-0.5 rounded-3xl`}>
                      <Text className={`${item.canChallenge ? 'text-grayscale-800' : 'text-grayscale-400'} text-xs`}>
                        {tag}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </Pressable>
          )}
        />
      )}
    </>
  );
};

export default GymListBottomSheet;
