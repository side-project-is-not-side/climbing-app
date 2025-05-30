import {HomeScreen} from '../../screens';
import {ROOT_ROUTES, RootRoute} from '../../shared/constants';
import {LogoIcon, TabIcon} from '../../shared/ui';
import ChallengeNavigation from './ChallengeNavigation';
import MapNavigation from './MapNavigation';
import MyNavigation from './MyNavigation';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {Text} from 'react-native';

const Tab = createBottomTabNavigator<RootRoute>();

const RootNavigation = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootRoute>>();

  useEffect(() => {
    navigation.navigate(ROOT_ROUTES.HOME);
  }, []);
  return (
    <Tab.Navigator
      initialRouteName={ROOT_ROUTES.HOME}
      screenOptions={{
        lazy: true,
        headerStyle: {
          backgroundColor: '#070707',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
        },
        headerTitleStyle: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 700,
        },
        tabBarStyle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: 50,
          height: 80,
          backgroundColor: '#191B1D',
          paddingTop: 11,
          paddingBottom: 30,
          elevation: 0,
          shadowOpacity: 0,
          borderTopWidth: 0,
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
          headerTitle: '',
          headerTransparent: true,
          headerLeft: LogoIcon,
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
        component={MapNavigation}
        options={{
          headerShown: false,
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
        name={ROOT_ROUTES.CHALLENGE}
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
          tabBarIcon: ({focused}) => <TabIcon name="Challenge" focused={focused} />,
        }}
      />
      <Tab.Screen
        name={ROOT_ROUTES.MY_PAGE}
        component={MyNavigation}
        options={{
          headerShown: false,
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
