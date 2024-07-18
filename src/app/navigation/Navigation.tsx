import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import RootNavigation from './RootNavigation';
import AuthNavigation from './AuthNavigation';
import {AUTH_ROUTES} from '../../shared/constants';
import {useAuthContext} from '../AuthContextProvider';

const Navigation = () => {
  const authContext = useAuthContext();
  return (
    <NavigationContainer>
      {authContext?.token ? (
        <RootNavigation />
      ) : (
        <AuthNavigation
          initialRouteName={
            authContext?.isFirstVisit
              ? AUTH_ROUTES.ONBOARDING
              : AUTH_ROUTES.LOGIN
          }
        />
      )}
    </NavigationContainer>
  );
};

export default Navigation;
