import React from 'react';
import {View} from 'react-native';
import NaverMapView from 'react-native-nmap';

const NaverMap = () => {
  return (
    <View style={{flex: 1}}>
      <NaverMapView
        style={{flex: 1, width: '100%', height: '100%'}}
        showsMyLocationButton={true}
        center={{latitude: 37.5665, longitude: 126.978}}
      />
    </View>
  );
};

export default NaverMap;
