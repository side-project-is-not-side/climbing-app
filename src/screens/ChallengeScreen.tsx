import Challenges from '@widgets/Challenges';
import React from 'react';
import {Text, View} from 'react-native';

const ChallengeScreen = () => {
  return (
    <View className="flex-1">
      <View className="px-5 py-6">
        <Text className="text-2xl font-bold text-white">
          클라이밍 챌린지를 수행하고 {'\n'}
          뱃지를 획득해봐요!
        </Text>
      </View>
      <Challenges />
    </View>
  );
};

export default ChallengeScreen;
