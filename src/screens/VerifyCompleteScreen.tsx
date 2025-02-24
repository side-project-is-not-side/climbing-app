import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CHALLENGE_ROUTES, ChallengeRoute} from '@shared/constants';
import React, {useLayoutEffect} from 'react';
import {Image, Text, View} from 'react-native';

type ScreenProps = NativeStackScreenProps<ChallengeRoute, 'verify_complete'>;

const VerifyCompleteScreen = ({route, navigation}: ScreenProps) => {
  const imageUrl = route.params.imageUrl;
  const {challengeId, activityType} = route.params;

  const pageOut = () => {
    setTimeout(() => {
      navigation.navigate(CHALLENGE_ROUTES.CHALLENGE_DETAIL, {
        challengeId,
        activityType,
      });
    }, 3000);
  };

  useLayoutEffect(() => {
    // if (!imageUrl) pageOut();
    pageOut();
  }, []);
  return (
    <View className="items-center justify-center flex-1 gap-2">
      {/* {imageUrl && (
        <Image src={imageUrl} className="w-[160px] h-[160px] rounded-lg" resizeMode="cover" onLoadEnd={pageOut} />
      )} */}
      <View className="relative w-[160px] h-[160px]">
        <Image
          source={require('/assets/images/fanfare.gif')}
          className="absolute left-1/2 -top-0 -translate-x-[105px] w-[210px] h-[150px]"
        />
        <Image
          source={require('/assets/images/buri_jump.gif')}
          className="absolute left-1/2 bottom-0 -translate-x-[61px] w-[122px] h-[139px]"
        />
      </View>
      <View className="items-center justify-center gap-1">
        <Text className="text-lg font-bold text-white">인증 완료🔥</Text>
        <Text className="text-base text-neutral-400">계속 도전해보자구 부리!</Text>
      </View>
    </View>
  );
};

export default VerifyCompleteScreen;
