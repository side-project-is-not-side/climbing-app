import {ChallengeStatus} from '../type';
import React from 'react';
import {Pressable, Text, View} from 'react-native';

const TABS: {value: ChallengeStatus; text: string}[] = [
  {value: 'NOT_STARTED', text: '챌린지'},
  {value: 'ONGOING', text: '진행중'},
  {value: 'SUCCESS', text: '완료'},
];

const Tabs = ({
  tabState,
  handleTabPress,
}: {
  tabState: ChallengeStatus;
  handleTabPress: (tab: ChallengeStatus) => void;
}) => {
  return (
    <View className="flex-row px-5 border-b border-b-neutral-600 mb-4">
      {TABS.map(tab => (
        <Pressable
          key={tab.value}
          className={`py-2 px-5 ${tab.value === tabState ? 'border-b-2 border-b-primary-400' : ''}`}
          onPress={() => handleTabPress(tab.value)}>
          <Text className={`text-base ${tab.value === tabState ? 'text-primary-400 font-bold' : 'text-neutral-400'}`}>
            {tab.text}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Tabs;
