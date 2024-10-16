import {LoginScreen, OnboardingScreen} from '../../screens';
import {AUTH_ROUTES, AuthRoute} from '../../shared/constants/routes';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from '@shared/constants';
import React from 'react';
import {SafeAreaView} from 'react-native';

const Stack = createNativeStackNavigator<AuthRoute>();

const AuthNavigation = ({initialRouteName}: {initialRouteName: keyof AuthRoute | undefined}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {backgroundColor: colors.gray800},
          contentStyle: {backgroundColor: colors.gray800},
        }}
        initialRouteName={initialRouteName}>
        <Stack.Screen name={AUTH_ROUTES.ONBOARDING} component={OnboardingScreen} />
        <Stack.Screen name={AUTH_ROUTES.LOGIN} component={LoginScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthNavigation;
