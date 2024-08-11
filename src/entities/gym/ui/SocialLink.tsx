import React, { useEffect, useRef } from 'react';
import { GetGymDetailResponse } from '../api/types';
import { ExternalLink } from '@shared/types';
import { AppState, Linking, Platform } from 'react-native';
import { Icon } from '@shared/ui';



function SocialLink({ instagram, naverMap }: Pick<GetGymDetailResponse, 'instagram' | 'naverMap'>) {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const handleClick = ({ scheme, link }: ExternalLink) => {
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
    <div className="flex gap-[10px]">
      <button
        className="flex flex-1 items-center py-[14px] px-4 rounded-[10px] bg-neutral-700 gap-[10px]"
        onClick={() => handleClick(instagram)}
      >
        <Icon size={18} name="Instagram" />
        <span className="text-neutral-400 font-text-2">인스타그램</span>
      </button>

      <button
        className="flex flex-1 items-center py-[14px] px-4 rounded-[10px] bg-neutral-700 gap-[10px]"
        onClick={() => handleClick(naverMap)}
      >
        <Icon size={18} name="NaverMap" />
        <span className="text-neutral-400 font-text-2"> 네이버 지도</span>
      </button>
    </div>
  );
}

export default SocialLink;
