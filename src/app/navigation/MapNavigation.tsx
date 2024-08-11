import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MAP_ROUTES, MapRoute} from '../../shared/constants';
import {MapDetailScreen, MapScreen} from '../../screens';

const Stack = createNativeStackNavigator<MapRoute>();

const MapNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade_from_bottom',
       headerShown:false
      }}>
      <Stack.Screen name={MAP_ROUTES.NEARBY} component={MapScreen} />
      <Stack.Screen name={MAP_ROUTES.DETAIL} component={MapDetailScreen} />
    </Stack.Navigator>
  );
};

export default MapNavigation;
