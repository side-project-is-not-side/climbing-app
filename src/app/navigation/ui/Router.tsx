import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StatusBar, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ROOT_ROUTES} from '../constants';
import {HomeScreen} from '../../../screens';
import TabIcon from '../../../shared/ui/TabIcon';

const Tab = createBottomTabNavigator();

const Router = () => {
  const {Navigator, Screen} = Tab;

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />

      <Navigator
        screenOptions={{
          lazy: true,
          tabBarStyle: {
            flexDirection: 'row',
            alignItems: 'center',
          },
          tabBarItemStyle: {
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
          tabBarLabel: ({focused, children}) => {
            return (
              <Text
                style={{
                  color: focused ? '#f54' : '#fff',
                  fontSize: 10,
                }}>
                {children}
              </Text>
            );
          },
        }}>
        <Screen
          name={ROOT_ROUTES.HOME}
          component={HomeScreen}
          options={{
            title: '홈',
            tabBarIcon: ({focused}) => (
              <TabIcon name={'Home'} focused={focused} />
            ),
          }}
        />
      </Navigator>
    </SafeAreaView>
  );
};

export default Router;
