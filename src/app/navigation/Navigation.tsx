import {AUTH_ROUTES} from '../../shared/constants';
import {useAuthContext} from '../AuthContextProvider';
import AuthNavigation from './AuthNavigation';
import RootNavigation from './RootNavigation';
import {DefaultTheme, NavigationContainer, Theme} from '@react-navigation/native';
import React from 'react';

const Navigation = () => {
  const authContext = useAuthContext();
  const theme: Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#191B1D',
    },
  };

  return (
    <>
      {authContext?.token ? (
        <NavigationContainer theme={theme}>
          <RootNavigation />
        </NavigationContainer>
      ) : (
        <NavigationContainer theme={theme}>
          <AuthNavigation initialRouteName={authContext?.onboarding ? AUTH_ROUTES.LOGIN : AUTH_ROUTES.ONBOARDING} />
        </NavigationContainer>
      )}
    </>
  );
};

export default Navigation;
