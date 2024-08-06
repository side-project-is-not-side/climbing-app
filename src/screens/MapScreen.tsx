import React from 'react';
import {NearbyBottomSheet, NearbyMap} from '../entities/map/ui';
import {View} from 'react-native';

const MapScreen = () => {
  return (
    <View style={{flex: 1}}>
      <NearbyMap />
      <NearbyBottomSheet />
    </View>
  );
};

export default MapScreen;
