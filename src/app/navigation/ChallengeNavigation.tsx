import {
  ChallengeDetailScreen,
  ChallengeScreen,
  VerificationDetailScreen,
  VerificationHistoryScreen,
  VerifyCompleteScreen,
  VerifyLocationScreen,
  VerifyPhotoScreen,
} from '../../screens';
import {CHALLENGE_ROUTES, ChallengeRoute} from '../../shared/constants';
import {colors} from '../../shared/constants';
import {Icon, LogoIcon} from '../../shared/ui';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Button, Pressable} from 'react-native';

const Stack = createNativeStackNavigator<ChallengeRoute>();

const ChallengeNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={'challenge'}
      screenOptions={({navigation}) => ({
        headerTitleAlign: 'center',
        headerTitleStyle: {fontSize: 16, fontWeight: '700', color: 'white'},
        headerLeft: () => (
          <Pressable onPress={navigation.goBack} className="items-center justify-center w-6 h-6">
            <Icon name="ArrowLeft" size={14} />
          </Pressable>
        ),
        headerBackground: () => <></>,
        animation: 'fade_from_bottom',
      })}>
      <Stack.Group
        screenOptions={{
          headerStyle: {backgroundColor: colors.gray800},
          contentStyle: {backgroundColor: colors.gray800},
        }}>
        <Stack.Screen
          name={CHALLENGE_ROUTES.CHALLENGE}
          component={ChallengeScreen}
          options={{
            title: '',
            headerLeft: LogoIcon,
          }}
        />
        <Stack.Screen
          name={CHALLENGE_ROUTES.CHALLENGE_DETAIL}
          component={ChallengeDetailScreen}
          options={({navigation}) => ({
            title: '',
            headerLeft: () => (
              <Pressable onPress={() => navigation.navigate('challenge')}>
                <Icon name="ArrowBack" size={24} color={'#fff'} />
              </Pressable>
            ),
          })}
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
        <Stack.Screen
          name={CHALLENGE_ROUTES.VERIFY_LOCATION}
          component={VerifyLocationScreen}
          options={({route}) => ({
            title: route.params?.challengeTitle,
          })}
        />
        <Stack.Screen
          name={CHALLENGE_ROUTES.VERIFY_COMPLETE}
          component={VerifyCompleteScreen}
          options={({route}) => ({
            title: '',
            headerLeft: () => <></>,
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
            headerStyle: {backgroundColor: colors.gray800},
            contentStyle: {backgroundColor: colors.gray800},
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ChallengeNavigation;
