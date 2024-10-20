import {AUTH_ROUTES} from '../../shared/constants';
import {useAuthContext} from '../AuthContextProvider';
import AuthNavigation from './AuthNavigation';
import RootNavigation from './RootNavigation';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';

const Navigation = () => {
  const authContext = useAuthContext();
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: '#191B1D',
        },
      }}>
      {authContext?.token ? (
        <RootNavigation />
      ) : (
        <AuthNavigation initialRouteName={authContext?.isFirstVisit ? AUTH_ROUTES.ONBOARDING : AUTH_ROUTES.LOGIN} />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
