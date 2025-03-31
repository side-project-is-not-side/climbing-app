import {useGetShareData} from '@entities/challenge/queries/useGetShareData';
import {ShareCard} from '@entities/challenge/ui';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ChallengeRoute} from '@shared/constants';
import {Icon} from '@shared/ui';
import {IconName} from '@shared/ui/Icon/Icon';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, Pressable, ScrollView, View} from 'react-native';
import {Text} from 'react-native';
import Share from 'react-native-share';
import Toast from 'react-native-toast-message';
import ViewShot from 'react-native-view-shot';

const CircleIconButton = ({text, icon, onPress}: {text: string; onPress: () => void; icon: IconName}) => {
  return (
    <Pressable onPress={onPress} className="justify-center items-center gap-[5px] mx-[30px]">
      <View className="w-[52px] h-[52px] bg-[#333539] rounded-full justify-center items-center">
        <Icon name={icon} />
      </View>
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

const notReady = () =>
  Toast.show({
    text1: '이미지를 준비중이예요. 잠시 후 다시 시도해주세요.',
    type: 'alert',
  });

const ChallengeShare = () => {
  const ref = useRef<ViewShot>(null);
  const route = useRoute<RouteProp<ChallengeRoute, 'challenge_share'>>();

  const {challengeId, activityType} = route.params;

  const [theme, setTheme] = useState<'DARK' | 'WHITE'>('DARK');
  const [loadedImages, setLoadedImages] = useState(0);
  const [captureImage, setCaptureImage] = useState<string>();

  const {data} = useGetShareData(challengeId, activityType);
  const totalRecordCount = data?.records.length;

  const captureScreen = () => {
    if (ref.current) {
      try {
        ref.current.capture?.().then(uri => {
          setCaptureImage(Platform.OS === 'ios' ? `file://${uri}` : uri);
        });
      } catch {}
    }
  };

  const shareImage = () => {
    if (!captureImage) return notReady();

    Share.open({
      url: captureImage,
    }).catch(() => console.log('user did not shared'));
  };

  const saveImage = () => {
    if (!captureImage) return notReady();

    CameraRoll.saveAsset(captureImage, {
      album: 'grabbers',
    }).then(() => {
      Toast.show({
        text1: '이미지를 다운로드 하였습니다.',
        type: 'alert',
      });
    });
  };

  useEffect(() => {
    if (totalRecordCount && loadedImages === totalRecordCount) {
      setTimeout(() => {
        captureScreen();
      }, 200);
    }
  }, [data, theme, loadedImages]);

  return (
    <ScrollView className="flex-1 ">
      <View className="justify-center px-8">
        <View className="flex-row">
          <ThemeButton text={'다크버전'} isSelected={theme === 'DARK'} onPress={() => setTheme('DARK')} />
          <ThemeButton text={'화이트버전'} isSelected={theme === 'WHITE'} onPress={() => setTheme('WHITE')} />
        </View>
        {data && (
          <ViewShot
            ref={ref}
            options={{
              format: 'png',
              fileName: `Grabbers_${data?.title}_${theme.toLowerCase()}_`,
            }}
            style={{marginVertical: 30}}>
            <ShareCard challenge={data} theme={theme} setLoadedImages={setLoadedImages} />
          </ViewShot>
        )}
        <View className="flex-row justify-center">
          <CircleIconButton text="공유하기" onPress={shareImage} icon="Share" />
          <CircleIconButton text="이미지 저장" onPress={saveImage} icon="Photo" />
        </View>
      </View>
    </ScrollView>
  );
};

export default ChallengeShare;
