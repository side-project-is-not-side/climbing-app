import {TabIcon} from '../../shared/ui';
import {HomeScreen, MapScreen, MyScreen} from '../../screens';

import {ROOT_ROUTES, RootRoute} from '../../shared/constants';
import ChallengeNavigation from './ChallengeNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator<RootRoute>();

const RootNavigation = () => {
  return (
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
          headerShown: false,
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
          tabBarIcon: ({focused}) => <TabIcon name="Home" focused={focused} />,
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
        component={ChallengeNavigation}
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
  );
};

export default RootNavigation;
