import {AUTH_ROUTES} from '../../shared/constants';
import {useAuthContext} from '../AuthContextProvider';
import AuthNavigation from './AuthNavigation';
import RootNavigation from './RootNavigation';
import {DefaultTheme, NavigationContainer, Theme} from '@react-navigation/native';
import React from 'react';

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

  if (token)
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
