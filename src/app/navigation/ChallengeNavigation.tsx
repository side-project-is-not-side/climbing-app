import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ChallengeScreen,
  ChallengeDetailScreen,
  VerificationHistoryScreen,
  VerifyPhotoScreen,
} from '../../screens';

import {CHALLENGE_ROUTES, ChallengeRoute} from '../../shared/constants';

const Stack = createNativeStackNavigator<ChallengeRoute>();

const ChallengeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
      <Stack.Screen
        name={CHALLENGE_ROUTES.CHALLENGE}
        component={ChallengeScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name={CHALLENGE_ROUTES.CHALLENGE_DETAIL}
        component={ChallengeDetailScreen}
        options={{
          title: '',
        }}
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
          title: route.params?.challengeTitle,
        })}
      />
    </Stack.Navigator>
  );
};

export default ChallengeNavigation;
