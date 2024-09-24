import React from 'react';
import {Dimensions, Image, ScrollView, Text, View} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const VerifyPhotoGuide = () => {
  return (
    <ScrollView style={{marginBottom: 16}}>
      <Image
        source={require('../../../../assets/images/verification_guide_1.png')}
        alt={'verification guide image'}
        style={{height: (deviceWidth - 40) * 0.434}}
        className="m-1 mx-auto rounded-xl"
        resizeMode="cover"
      />
      <View className="items-center justify-center gap-1 mt-4 mb-9">
        <Text className="text-sm font-bold text-[#00BA77]">인증 방법</Text>
        <Text className="text-lg font-bold text-white">도착점에 완등한 자신의 사진🔥</Text>
        <Text className="text-sm text-neutral-400">벽의 완등 지점에서 찍은 사진을 올려주세요.</Text>
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
        <Text className="text-lg font-bold text-white">벽과 자신이 드러나지 않은 사진🙅‍♂️</Text>
        <Text className="text-sm text-neutral-400">암장의 벽과 자신이 들어가지 않은 사진은 지양해주세요.</Text>
      </View>
    </ScrollView>
  );
};

export default VerifyPhotoGuide;
