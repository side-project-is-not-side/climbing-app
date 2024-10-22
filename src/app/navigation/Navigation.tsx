import {AUTH_ROUTES} from '../../shared/constants';
import {useAuthContext} from '../AuthContextProvider';
import AuthNavigation from './AuthNavigation';
import RootNavigation from './RootNavigation';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

const Navigation = () => {
  const authContext = useAuthContext();

  return (
    <>
      {authContext?.token ? (
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthNavigation initialRouteName={authContext?.onboarding ? AUTH_ROUTES.LOGIN : AUTH_ROUTES.ONBOARDING} />
        </NavigationContainer>
      )}
    </>
  );
};

export default Navigation;
