'use client';

import {CHALLENGE_ROUTES, ChallengeRoute, colors} from '../../../shared/constants';
import {Badge} from '../../../shared/ui';
import {Challenge, ChallengeStatus} from '../type';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Image, Pressable, Text, View} from 'react-native';

const activityTypes = {
  PICTURE: '사진 챌린지',
  VIDEO: '레벨도전',
  LOCATION: '암장도전',
  ATTENDANCE: '출석 챌린지',
};

const Card = ({challenge, tabState}: {challenge: Challenge; tabState: ChallengeStatus}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const handlePressCard = () => {
    navigation.navigate(CHALLENGE_ROUTES.CHALLENGE_DETAIL, {
      challengeId: challenge.id,
      activityType: challenge.activityType,
    });
  };

  const cardLayout = () => {
    const defaultLayout = {
      imageSize: 100,
      badgeText: `${challenge.activityCount}/${challenge.successCount}`,
      badgePosition: 'justify-end mt-[10px]',
    };

    switch (tabState) {
      case 'NOT_STARTED':
        return {source: require('../../../../assets/images/challenge_lock.png'), ...defaultLayout};
      case 'ONGOING':
        return {source: require('../../../../assets/images/challenge.png'), ...defaultLayout};
      case 'SUCCESS':
        return {
          // source: {uri: challenge.imageUrl.color},
          source: {uri: challenge.successImageUrl},
          imageSize: 160,
          badgeText: '기록보기',
          badgePosition: 'justify-start mt-[16px]',
        };
    }
  };

  return (
    <Pressable
      className="flex-row py-5 pl-5 pr-4 my-[5px] mx-auto bg-neutral-700 rounded-2xl"
      onPress={handlePressCard}>
      <Image
        source={cardLayout().source}
        width={100}
        height={100}
        resizeMode="cover"
        className={`w-[${cardLayout().imageSize}px] h-[${
          cardLayout().imageSize
        }px] border border-white mr-4 rounded-lg`}
      />
      <View className="flex-1 justify-center">
        <Text className="mb-1 text-xs font-bold text-primary-400">{activityTypes[challenge.activityType]}</Text>
        <Text className="text-lg font-bold text-white" numberOfLines={1} ellipsizeMode="tail">
          {challenge.title}
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail" className="text-neutral-400">
          {challenge.summary}
        </Text>
        <View className={`flex-row ${cardLayout().badgePosition}`}>
          <Badge text={cardLayout().badgeText} />
        </View>
      </View>
    </Pressable>
  );
};

export default Card;
