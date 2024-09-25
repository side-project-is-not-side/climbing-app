import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyScreen from '@screens/MyScreen';
import UserInfoScreen from '@screens/UserInfoScreen';
import {MY_ROUTES, MyRoute} from '@shared/constants';
import {Icon} from '@shared/ui';
import React from 'react';
import {Pressable} from 'react-native';

const Stack = createNativeStackNavigator<MyRoute>();

const MyNavigation = () => {
  return (
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
          fontWeight: 700,
        },
        headerLeft: () => (
          <Pressable onPress={navigation.goBack} className="items-center justify-center w-6 h-6">
            <Icon name="ChevronLeft" size={14} />
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
    </Stack.Navigator>
  );
};

export default MyNavigation;
