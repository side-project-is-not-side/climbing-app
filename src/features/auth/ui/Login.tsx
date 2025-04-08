import {useLogin} from '../hooks/useLogin';
import GuestGuideTab from './GuestGuideTab';
import LoginButton from './LoginButton';
import BottomSheet from '@gorhom/bottom-sheet';
import {useLayoutEffect, useRef, useState} from 'react';
import {Platform, Text, View} from 'react-native';

const Login = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isShowTab, setIsShowTab] = useState(false);

  const login = useLogin();

  const showTab = () => {
    bottomSheetRef.current?.expand();
    setIsShowTab(true);
  };

  const hideTab = () => {
    bottomSheetRef.current?.collapse();
    setIsShowTab(false);
  };

  // useLayoutEffect(() => {
  //   hideTab();
  // });
  return (
    <View className="flex-1 px-5 justify-center">
      <Text className={`text-white w-full p-5 font-bold text-2xl ${Platform.OS === 'ios' ? 'mb-10' : 'mb-[50px]'}`}>
        그래버즈와 {'\n'}홀드를 그랩하러 가볼까요🔥
      </Text>
      <View className="gap-4 min-h-[420px]">
        {Platform.OS === 'ios' && (
          <LoginButton
            icon="Apple"
            onPress={() => {
              login('APPLE');
            }}>
            <Text>애플 로그인</Text>
          </LoginButton>
        )}
        <LoginButton
          icon="Kakao"
          onPress={() => {
            login('KAKAO');
          }}>
          <Text>카카오 로그인</Text>
        </LoginButton>
        {/* <LoginButton icon="Naver" disabled>
          <Text>네이버 로그인</Text>
        </LoginButton>
        <LoginButton icon="Google" className="mb-4" disabled>
          <Text>구글 로그인</Text>
        </LoginButton> */}
        <View className="w-full h-[1px] bg-white opacity-20 mb-4"></View>
        <LoginButton icon="Guest" onPress={showTab}>
          <Text>일일 계정 로그인</Text>
        </LoginButton>
      </View>
      <GuestGuideTab ref={bottomSheetRef} hideTab={hideTab} isShowTab={isShowTab} />
    </View>
  );
};

export default Login;
