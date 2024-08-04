import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MAP_ROUTES} from '../../shared/constants';
import {MapScreen} from '../../screens';

const Stack = createNativeStackNavigator();

const MapNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade_from_bottom',
      }}>
      <Stack.Screen name={MAP_ROUTES.NEARBY} component={MapScreen} />
    </Stack.Navigator>
  );
};

export default MapNavigation;
