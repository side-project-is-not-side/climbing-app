import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ChallengeScreen,
  ChallengeDetailScreen,
  VerificationHistoryScreen,
  VerifyPhotoScreen,
  VerificationDetailScreen,
} from '../../screens';

import {CHALLENGE_ROUTES, ChallengeRoute} from '../../shared/constants';
import {colors} from '../../shared/constants';
import {Image} from 'react-native';

const Stack = createNativeStackNavigator<ChallengeRoute>();

const ChallengeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerTitleStyle: {fontSize: 16},
        headerBackground: () => <></>,
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
        name={CHALLENGE_ROUTES.VERIFICATION_DETAIL}
        component={VerificationDetailScreen}
        options={{
          title: '인증 기록',
          animation: 'slide_from_bottom',
        }}
      />
      <Stack.Screen
        name={CHALLENGE_ROUTES.VERIFY_PHOTO}
        component={VerifyPhotoScreen}
        options={({route}) => ({
          title: route.params?.challengeTitle,
        })}
      />
    </Stack.Navigator>
  );
};

export default ChallengeNavigation;
