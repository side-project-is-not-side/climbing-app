import React from 'react';

import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import TabIcon from '../../../shared/ui/TabIcon';
import {
  HomeScreen,
  MapScreen,
  ChallengeScreen,
  ChallengeDetailScreen,
  MyScreen,
} from '../../../screens';

import {CHALLENGE_ROUTES, ROOT_ROUTES} from '../constants/routes';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ChallengeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={CHALLENGE_ROUTES.CHALLENGE}
        component={ChallengeScreen}
      />
      <Stack.Screen
        name={CHALLENGE_ROUTES.CHALLENGE_DETAIL}
        component={ChallengeDetailScreen}
        options={{
          title: '',
        }}
      />
    </Stack.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={ROOT_ROUTES.HOME}
        screenOptions={{
          lazy: true,
          tabBarStyle: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            rowGap: 50,
            height: 80,
            backgroundColor: '#191B1D',
            paddingTop: 11,
            paddingBottom: 30,
          },
          tabBarItemStyle: {
            height: 40,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          },
        }}>
        <Tab.Screen
          name={ROOT_ROUTES.HOME}
          component={HomeScreen}
          options={{
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    color: focused ? '#ff5544' : '#ffffff',
                    fontSize: 10,
                  }}>
                  홈
                </Text>
              );
            },
            tabBarIcon: ({focused}) => (
              <TabIcon name="Home" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name={ROOT_ROUTES.MAP}
          component={MapScreen}
          options={{
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    color: focused ? '#ff5544' : '#ffffff',
                    fontSize: 10,
                  }}>
                  암장찾기
                </Text>
              );
            },
            tabBarIcon: ({focused}) => <TabIcon name="Map" focused={focused} />,
          }}
        />
        <Tab.Screen
          name={'challenge_group'}
          component={ChallengeNavigator}
          options={{
            headerShown: false,
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    color: focused ? '#f54' : '#fff',
                    fontSize: 10,
                  }}>
                  그랩 챌린지
                </Text>
              );
            },
            tabBarIcon: ({focused}) => (
              <TabIcon name="Challenge" focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name={ROOT_ROUTES.MY_PAGE}
          component={MyScreen}
          options={{
            tabBarLabel: ({focused}) => {
              return (
                <Text
                  style={{
                    color: focused ? '#f54' : '#fff',
                    fontSize: 10,
                  }}>
                  마이 페이지
                </Text>
              );
            },
            tabBarIcon: ({focused}) => <TabIcon name="My" focused={focused} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
