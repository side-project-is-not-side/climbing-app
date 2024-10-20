import AnimatedSpinner from './AnimatedSpinner';
import React from 'react';
import {Text, View} from 'react-native';

function LoadingSpinner() {
  return (
    <View className="flex-1 mx-auto flex items-center justify-center">
      <AnimatedSpinner />

      <Text className="text-neutral-400 text-center font-text-2">암장 정보를 가져오는 중입니다.</Text>
    </View>
  );
}

export default LoadingSpinner;
