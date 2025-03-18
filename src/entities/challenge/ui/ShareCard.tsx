import {ActivityLocation, ActivityPicture, ChallengeShare} from '../type';
import {formatKST} from '@shared/utils';
import React from 'react';
import {Image, Text, View} from 'react-native';

const themeStyle = {
  DARK: {
    bg: 'bg-neutral-700',
    text: 'text-white',
  },
  WHITE: {
    bg: 'bg-white',
    text: 'text-neutral-black',
  },
};

const ShareCard = ({challenge, theme}: {challenge: ChallengeShare; theme: 'DARK' | 'WHITE'}) => {
  const {title, userName, successImageUrl, challengeStartDate, challengeEndDate, records} = challenge;

  return (
    <View className={`${themeStyle[theme].bg} rounded-[20px] px-[20px] py-[30px] justify-center items-center`}>
      <View className="gap-[6px]">
        <Text className="text-center text-primary-400">Challenge complleted!</Text>
        <Text className={`text-center ${themeStyle[theme].text} font-bold text-2xl`}>{title}</Text>
      </View>
      <View className="justify-center items-center gap-4 my-4">
        <Image src={successImageUrl} className="w-[182px] h-[182px] rounded-2xl" />
        <View className="py-4 gap-0.5">
          <Text className={`text-center ${themeStyle[theme].text} font-bold`}>{userName}</Text>
          <Text className={`text-center ${themeStyle[theme].text} opacity-50 text-sm`}>
            {formatKST(challengeStartDate)} - {formatKST(challengeEndDate)}
          </Text>
        </View>
      </View>
      {challenge.activityType === 'PICTURE' ? (
        <View className="flex-row justify-center flex-wrap">
          {(records as ActivityPicture[]).map(record => (
            <Image key={record.id} src={record.imageUrl} className="w-[50px] h-[50px] m-1 rounded-sm " />
          ))}
        </View>
      ) : (
        <View>
          {(records as ActivityLocation[]).map(record => (
            <></>
          ))}
        </View>
      )}
    </View>
  );
};

export default ShareCard;
