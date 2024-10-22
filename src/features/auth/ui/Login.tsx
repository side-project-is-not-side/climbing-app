import {useLogin} from '../hooks/useLogin';
import LoginButton from './LoginButton';
import React from 'react';
import {Platform, Text, View} from 'react-native';

const Login = () => {
  const login = useLogin();
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
        <LoginButton icon="Naver" disabled>
          <Text>네이버 로그인</Text>
        </LoginButton>
        <LoginButton icon="Google" disabled>
          <Text>구글 로그인</Text>
        </LoginButton>
      </View>
    </View>
  );
};

export default Login;
