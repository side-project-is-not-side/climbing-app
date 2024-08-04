import React from 'react';
import {Image, View} from 'react-native';

const LogoIcon = () => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <Image
        source={require('../../../../assets/grabbers_logo.png')}
        style={{width: 103, height: 13}}
      />
    </View>
  );
};

export default LogoIcon;
