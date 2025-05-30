import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ExternalPageScreen} from '@screens/ExternalPageScreen';
import {MyScreen, PolicyScreen, TermsScreen, UserInfoScreen} from '@screens/my';
import {MY_ROUTES, MyRoute} from '@shared/constants';
import {Icon} from '@shared/ui';
import React from 'react';
import {Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator<MyRoute>();

const MyNavigation = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#000'}}>
      <Stack.Navigator
        screenOptions={({navigation}) => ({
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#070707',
          },
          headerShadowVisible: false,
          headerTitleStyle: {
            color: '#fff',
            fontSize: 16,
            fontWeight: '700',
          },
          headerLeft: () => (
            <Pressable onPress={navigation.goBack} className="items-center justify-center w-6 h-6">
              <Icon name="ArrowLeft" size={24} />
            </Pressable>
          ),
          animation: 'fade_from_bottom',
        })}
        initialRouteName={MY_ROUTES.MY}>
        <Stack.Screen options={{headerShown: false}} name={MY_ROUTES.MY} component={MyScreen} />
        <Stack.Screen
          options={{
            headerTitle: '내 계정',
          }}
          name={MY_ROUTES.USER_INFO}
          component={UserInfoScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: '개인정보처리방침',
          }}
          name={MY_ROUTES.POLICY}
          component={PolicyScreen}
        />
        <Stack.Screen
          options={{
            headerTitle: '이용 약관',
          }}
          name={MY_ROUTES.TERMS}
          component={TermsScreen}
        />
        <Stack.Screen
          options={({navigation}) => ({
            headerTitle: '',
            headerLeft: () => (
              <Pressable onPress={navigation.goBack} className="items-center justify-center w-6 h-6">
                <Icon name="Close" size={14} />
              </Pressable>
            ),
          })}
          name={MY_ROUTES.EXTERNAL}
          component={ExternalPageScreen}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
};

export default MyNavigation;
