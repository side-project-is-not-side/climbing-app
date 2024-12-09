import {AUTH_ROUTES} from '../../shared/constants';
import {useAuthContext} from '../AuthContextProvider';
import AuthNavigation from './AuthNavigation';
import RootNavigation from './RootNavigation';
import {unlink} from '@react-native-seoul/kakao-login';
import {DefaultTheme, NavigationContainer, Theme} from '@react-navigation/native';
import {clearStorage} from '@shared/utils';
import React, {useEffect} from 'react';

const Navigation = () => {
  const authContext = useAuthContext();

  if (!authContext) return <></>;

  const {token, onboarding} = authContext;

  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#191B1D',
    },
  };

  console.log('app token: ' + token);

  // 스토리지 리셋 테스트
  // useEffect(() => {
  //   clearStorage();
  //   unlink();
  // }, []);
  if (token && token !== '')
    return (
      <NavigationContainer theme={theme}>
        <RootNavigation />
      </NavigationContainer>
    );

  return (
    <NavigationContainer theme={theme}>
      <AuthNavigation
        initialRouteName={onboarding ? AUTH_ROUTES.LOGIN : AUTH_ROUTES.ONBOARDING}
        onboarding={onboarding}
      />
    </NavigationContainer>
  );
};

export default Navigation;
