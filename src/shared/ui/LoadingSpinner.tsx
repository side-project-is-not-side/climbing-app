import React from 'react';
import { Image, Text, View } from 'react-native';


function LoadingSpinner() {
  return (
    <View className="flex-1 mx-auto">
      <Image
        source={{uri:'/images/spinner.png'}}
        className="animate-spin mx-auto"
        width={50}
        height={50}
        alt="위치 정보 불러오는 중"
      />
      <Text className="text-neutral-400 text-center font-text-2">암장 정보를 가져오는 중입니다.</Text>
    </View>
  );
}

export default LoadingSpinner;
