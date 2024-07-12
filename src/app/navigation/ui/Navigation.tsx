import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';
import {ROOT_ROUTES} from '../constants/routes';
import {HomeScreen, MapScreen, ChallengeScreen} from '../../../screens';
import TabIcon from '../../../shared/ui/TabIcon';
import {NavigationContainer} from '@react-navigation/native';
import MyScreen from '../../../screens/ui/MyScreen';

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
        <Screen
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
        <Screen
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
        <Screen
          name={ROOT_ROUTES.CHALLENGE}
          component={ChallengeScreen}
          options={{
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
        <Screen
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
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
