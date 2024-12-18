import {LoginScreen, OnboardingScreen} from '../../screens';
import {AUTH_ROUTES, AuthRoute} from '../../shared/constants/routes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp, createNativeStackNavigator} from '@react-navigation/native-stack';
import {colors} from '@shared/constants';
import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';

const Stack = createNativeStackNavigator<AuthRoute>();

const AuthNavigation = ({
  initialRouteName,
  onboarding,
}: {
  initialRouteName: keyof AuthRoute | undefined;
  onboarding: boolean;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<AuthRoute>>();

  useEffect(() => {
    if (onboarding) {
      navigation.navigate('login');
    }
  }, [onboarding]);

  useEffect(() => {}, [navigation.addListener('beforeRemove', e => e.preventDefault())]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          headerStyle: {backgroundColor: colors.gray700},
          contentStyle: {backgroundColor: colors.gray700},
        }}
        initialRouteName={initialRouteName}>
        <Stack.Screen name={AUTH_ROUTES.ONBOARDING} component={OnboardingScreen} />
        <Stack.Screen name={AUTH_ROUTES.LOGIN} component={LoginScreen} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default AuthNavigation;
