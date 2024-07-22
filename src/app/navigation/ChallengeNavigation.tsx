import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ChallengeScreen,
  ChallengeDetailScreen,
  VerificationHistoryScreen,
  VerifyPhotoScreen,
  VerificationDetailScreen,
  VerifyLocationScreen,
  VerifyGuideScreen,
} from '../../screens';

import {CHALLENGE_ROUTES, ChallengeRoute} from '../../shared/constants';
import {colors} from '../../shared/constants';
import {Button, Image, Pressable} from 'react-native';

const Stack = createNativeStackNavigator<ChallengeRoute>();

const ChallengeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {fontSize: 16},
        headerBackground: () => <></>,
        animation: 'fade_from_bottom',
      }}>
      <Stack.Group
        screenOptions={{
          headerStyle: {backgroundColor: colors.beige100},
          contentStyle: {backgroundColor: colors.beige100},
        }}>
        <Stack.Screen
          name={CHALLENGE_ROUTES.CHALLENGE}
          component={ChallengeScreen}
          options={{
            title: '',
            headerLeft: () => (
              <Image
                source={require('../../../assets/icons/logo_grabbers.png')}
              />
            ),
          }}
        />
        <Stack.Screen
          name={CHALLENGE_ROUTES.CHALLENGE_DETAIL}
          component={ChallengeDetailScreen}
          options={{title: ''}}
        />
        <Stack.Screen
          name={CHALLENGE_ROUTES.VERIFICATION_HISTORY}
          component={VerificationHistoryScreen}
          options={{
            title: '인증 기록',
          }}
        />
        <Stack.Screen
          name={CHALLENGE_ROUTES.VERIFY_PHOTO}
          component={VerifyPhotoScreen}
          options={({route}) => ({
            title: route.params?.challengeTitle + ' 사진인증',
          })}
        />
        <Stack.Screen
          name={CHALLENGE_ROUTES.VERIFY_LOCATION}
          component={VerifyLocationScreen}
          options={({route}) => ({
            title: route.params?.challengeTitle + ' 위치 인증',
          })}
        />
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          animation: 'slide_from_bottom',
        }}>
        <Stack.Screen
          name={CHALLENGE_ROUTES.VERIFICATION_DETAIL}
          component={VerificationDetailScreen}
          options={{
            title: '인증 기록',
            presentation: 'modal',
            headerStyle: {backgroundColor: colors.beige100},
            contentStyle: {backgroundColor: colors.beige100},
          }}
        />
        <Stack.Screen
          name={CHALLENGE_ROUTES.VERIFY_GUIDE}
          component={VerifyGuideScreen}
          options={{
            title: '',
            presentation: 'transparentModal',
            headerShown: false,
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ChallengeNavigation;
