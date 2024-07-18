import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {LoginScreen, OnboardingScreen} from '../../screens';

import {AUTH_ROUTES, AuthRoute} from '../../shared/constants/routes';

const Stack = createNativeStackNavigator<AuthRoute>();

const AuthNavigation = ({
  initialRouteName,
}: {
  initialRouteName: keyof AuthRoute | undefined;
}) => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      <Stack.Screen
        name={AUTH_ROUTES.ONBOARDING}
        component={OnboardingScreen}
      />
      <Stack.Screen name={AUTH_ROUTES.LOGIN} component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
