import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CHALLENGE_ROUTES, ChallengeRoute} from '@shared/constants';
import {Button, Icon} from '@shared/ui';
import React, {useLayoutEffect} from 'react';
import {Image, Pressable, Text, View} from 'react-native';

type ScreenProps = NativeStackScreenProps<ChallengeRoute, 'verify_complete'>;

const VerifyCompleteScreen = ({route, navigation}: ScreenProps) => {
  const {challengeId, activityType, challengeTitle, success, successImageUrl} = route.params;

  const pageOut = () => {
    setTimeout(() => {
      navigation.navigate(CHALLENGE_ROUTES.CHALLENGE_DETAIL, {
        challengeId,
        activityType,
      });
    }, 4000);
  };

  const navigateToShare = () => {
    navigation.navigate(CHALLENGE_ROUTES.CHALLENGE_SHARE, {
      challengeId,
      activityType,
    });
  };

  useLayoutEffect(() => {
    !success && pageOut();

    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() =>
            navigation.navigate(CHALLENGE_ROUTES.CHALLENGE_DETAIL, {
              challengeId,
              activityType,
            })
          }
          className="items-center justify-center w-6 h-6">
          <Icon name="Close" size={20} />
        </Pressable>
      ),
    });
  }, []);
  return (
    <View className="items-center justify-center flex-1 gap-2">
      {success ? (
        <View className="flex-1 w-full p-5">
          <View className="flex-1 justify-center items-center">
            <Image src={successImageUrl} className="w-[160px] h-[160px] rounded-lg mb-11" resizeMode="cover" />
            <Text className="text-white font-bold text-2xl">{challengeTitle} 획득🔥</Text>
          </View>
          <Button classNames={{outter: 'w-full'}} onPress={navigateToShare}>
            공유하기
          </Button>
        </View>
      ) : (
        <>
          <View className="relative w-[160px] h-[160px]">
            <Image
              source={require('/assets/images/Mission_completed01.gif')}
              className="absolute left-1/2 -top-0 -translate-x-[105px] w-[210px] h-[150px]"
            />
            <Image
              source={require('/assets/images/Mission_completed02.gif')}
              className="absolute left-1/2 bottom-0 -translate-x-[61px] w-[122px] h-[139px]"
            />
          </View>
          <View className="items-center justify-center gap-1">
            <Text className="text-lg font-bold text-white">인증 완료🔥</Text>
            <Text className="text-base text-neutral-400">계속 도전해보자구 부리!</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default VerifyCompleteScreen;
