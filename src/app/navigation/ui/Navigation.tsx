import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import {ROOT_ROUTES} from '../constants/routes';
import {HomeScreen} from '../../../screens';
import TabIcon from '../../../shared/ui/TabIcon';
import {NavigationContainer} from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const Navigation = () => {
  const {Navigator, Screen} = Tab;
  return (
    <NavigationContainer>
      <Navigator
        initialRouteName={ROOT_ROUTES.HOME}
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
            tabBarLabel: '홈',
            tabBarIcon: ({focused}) => (
              <TabIcon name="Home" focused={focused} />
            ),
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
