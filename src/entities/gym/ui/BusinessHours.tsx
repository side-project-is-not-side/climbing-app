import {TBusinessHours} from '../api/types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  businessHours: TBusinessHours;
};

const DAY_LABEL: Record<keyof TBusinessHours, string> = {
  monday: '월',
  tuesday: '화',
  wednesday: '수',
  thursday: '목',
  friday: '금',
  saturday: '토',
  sunday: '일',
};

function BusinessHours({businessHours}: Props) {
  console.log(businessHours);

  return (
    <View className="flex-col flex-wrap h-[92px] mb-5">
      {Object.entries(businessHours).map(([key, value]) => (
        <View key={key} className="flex-row w-1/2">
          <Text className="font-text-2 text-white mr-[10px]">{DAY_LABEL[key as keyof TBusinessHours]}</Text>
          <Text className="font-text-2 text-neutral-400">{value}</Text>
        </View>
      ))}
    </View>
  );
}

export default BusinessHours;
