import {useGetShareData} from '@entities/challenge/queries/useGetShareData';
import {ShareCard} from '@entities/challenge/ui';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ChallengeRoute} from '@shared/constants';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, Pressable, ScrollView, View} from 'react-native';
import {Text} from 'react-native';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import ViewShot from 'react-native-view-shot';

const ShareButton = ({text, onPress}: {text: string; onPress: () => void}) => {
  return (
    <Pressable onPress={onPress} className="justify-center items-center gap-[5px] mx-[30px]">
      <View className="w-[52px] h-[52px] bg-[#333539] rounded-full"></View>
      <Text className="text-[#D9D9D9] text-xs">{text}</Text>
    </Pressable>
  );
};

const ThemeButton = ({text, isSelected, onPress}: {text: string; isSelected: boolean; onPress: () => void}) => {
  return (
    <Pressable
      className={`py-1 w-[86px] rounded-full mr-2 ${isSelected ? 'bg-primary-400' : 'bg-[#333539]'}`}
      onPress={onPress}>
      <Text className={`text-center ${isSelected ? 'text-neutral-black' : 'text-white'}`}>{text}</Text>
    </Pressable>
  );
};

const ChallengeShare = () => {
  const ref = useRef<ViewShot>(null);
  const route = useRoute<RouteProp<ChallengeRoute, 'challenge_share'>>();

  const {challengeId, activityType} = route.params;
  const [captureImage, setCaptureImage] = useState<string>();
  const [theme, setTheme] = useState<'DARK' | 'WHITE'>('DARK');

  const {data} = useGetShareData(challengeId, activityType);

  const captureScreen = () => {
    if (ref.current) {
      try {
        ref.current.capture?.().then(uri => {
          setCaptureImage(Platform.OS === 'ios' ? `file://${uri}` : uri);
          console.log('캡처 성공:', uri);
        });
      } catch {}
    }
  };

  const shareImage = () => {
    if (!captureImage) return console.log('no image');
    Share.open({
      url: captureImage,
    });
  };

  useEffect(() => {
    data &&
      setTimeout(() => {
        captureScreen();
      }, 150);
  }, [data, theme]);

  return (
    <ScrollView className="flex-1 ">
      <View className="justify-center px-8">
        <View className="flex-row">
          <ThemeButton text={'다크버전'} isSelected={theme === 'DARK'} onPress={() => setTheme('DARK')} />
          <ThemeButton text={'화이트버전'} isSelected={theme === 'WHITE'} onPress={() => setTheme('WHITE')} />
        </View>
        <ViewShot
          ref={ref}
          options={{
            format: 'png',
          }}
          style={{marginVertical: 30}}>
          {data && <ShareCard challenge={data} theme={theme} />}
        </ViewShot>
        <View className="flex-row justify-center">
          <ShareButton text="공유하기" onPress={shareImage} />
          <ShareButton
            text="이미지 저장"
            onPress={() => {
              captureImage &&
                CameraRoll.saveAsset(captureImage).then(() => {
                  Toast.show({
                    text1: '이미지를 다운로드 하였습니다.',
                    type: 'alert',
                  });
                });
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ChallengeShare;
