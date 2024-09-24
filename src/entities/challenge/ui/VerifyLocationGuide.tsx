import React from 'react';
import {Dimensions, Image, ScrollView, Text, View} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const VerifyLocationGuide = () => {
  return (
    <ScrollView style={{marginBottom: 16}}>
      <Image
        source={require('../../../../assets/images/verification_guide_1.png')}
        alt={'verification guide image'}
        style={{height: (deviceWidth - 40) * 0.434}}
        className="m-1 mx-auto rounded-xl"
        resizeMode="cover"
      />
      <View className="items-center justify-center gap-1 mt-4 mb-6">
        <Text className="text-sm font-bold text-[#00BA77]">인증 방법</Text>
        <Text className="text-lg font-bold text-white">위치인증 위치인증🔥</Text>
        <Text className="text-sm text-neutral-400">위치인증 위치인증.</Text>
      </View>
      <Image
        source={require('../../../../assets/images/verification_guide_2.png')}
        alt={'verification guide image'}
        style={{height: (deviceWidth - 40) * 0.434}}
        className="m-1 mx-auto rounded-xl"
        resizeMode="cover"
      />
      <View className="items-center justify-center gap-1 mt-4">
        <Text className="text-sm font-bold text-[#FF4538]">인증 불가</Text>
        <Text className="text-lg font-bold text-white">위치인증 위치인증🙅‍♂️</Text>
        <Text className="text-sm text-neutral-400">위치인증 위치인증.</Text>
      </View>
    </ScrollView>
  );
};

export default VerifyLocationGuide;
