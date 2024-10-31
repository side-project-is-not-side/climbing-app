import {MapDetailScreen, MapScreen} from '../../screens';
import {MAP_ROUTES, MapRoute} from '../../shared/constants';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Icon} from '@shared/ui';
import React from 'react';
import {Pressable} from 'react-native';

const Stack = createNativeStackNavigator<MapRoute>();

const MapNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName={MAP_ROUTES.NEARBY}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#070707',
        },
        headerTitleStyle: {
          color: '#fff',
          fontSize: 16,
          fontWeight: '700',
        },
      }}>
      <Stack.Screen name={MAP_ROUTES.NEARBY} component={MapScreen} options={{title: '지도'}} />
      <Stack.Screen
        name={MAP_ROUTES.DETAIL}
        component={MapDetailScreen}
        options={({navigation}) => ({
          title: '지도',
          headerLeft: () => (
            <Pressable onPress={navigation.goBack} className="items-center justify-center w-6 h-6">
              <Icon name="ArrowLeft" size={24} />
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => navigation.reset({routes: [{name: MAP_ROUTES.NEARBY}]})}
              className="items-center justify-center w-6 h-6">
              <Icon name="Close" size={20} />
            </Pressable>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
export default MapNavigation;
