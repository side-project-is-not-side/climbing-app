import {GetGymDetailResponse} from '../api/types';
import {ExternalLink} from '@shared/types';
import {Icon} from '@shared/ui';
import {InstagramGray} from '@shared/ui/Icons';
import React, {useEffect, useRef} from 'react';
import {AppState, Linking, Platform, Text, TouchableOpacity, View} from 'react-native';

function SocialLink({instagram, naverMap}: Pick<GetGymDetailResponse, 'instagram' | 'naverMap'>) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClick = ({scheme, link}: ExternalLink) => {
    const isIphone = Platform.OS === 'ios';
    const isAndroid = Platform.OS === 'android';

    if (isIphone) {
      Linking.openURL(scheme).catch(() => {
        timerRef.current = setTimeout(() => {
          Linking.openURL(link);
        }, 1500);
      });
      return;
    }

    if (isAndroid) {
      Linking.openURL(link);
      if (!timerRef.current) {
        return;
      }

      timerRef.current = setTimeout(() => {
        Linking.openURL(link);
      }, 1500);

      return;
    }

    Linking.openURL(link);
  };

  useEffect(() => {
    const removeOpenLink = () => {
      if (!timerRef.current) {
        return;
      }

      clearTimeout(timerRef.current);
    };

    const handleAppStateChange = (nextAppState: string) => {
      if (nextAppState === 'active') {
        removeOpenLink();
      }
    };

    // AppState 이벤트 리스너 등록
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  return (
    <View className="flex-row gap-x-[10px]">
      <TouchableOpacity
        className="flex-row flex-1 items-center py-[14px] px-4 rounded-[10px] bg-neutral-700"
        onPress={() => handleClick(instagram)}>
        <Icon size={18} name="InstagramGray" />
        <Text className="text-neutral-400 font-text-2 ml-[10px]">인스타그램</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row flex-1 items-center py-[14px] px-4 rounded-[10px] bg-neutral-700"
        onPress={() => handleClick(naverMap)}>
        <Icon size={18} name="NaverGray" />
        <Text className="text-neutral-400 font-text-2 ml-[10px]"> 네이버 지도</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SocialLink;
