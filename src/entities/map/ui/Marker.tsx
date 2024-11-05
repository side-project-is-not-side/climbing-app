import {Icon} from '../../../shared/ui';
import {IconName} from '../../../shared/ui/Icon/Icon';
import {MarkerType} from '../types';
import {NaverMapMarkerOverlay, NaverMapMarkerOverlayProps} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {View} from 'react-native';

type MarkerProps = {type?: MarkerType} & Omit<NaverMapMarkerOverlayProps, 'width' | 'height'>;

const markerIconName: Record<MarkerType, IconName> = {
  disabled: 'MarkerDisabled',
  inactive: 'MarkerInactive',
  active: 'MarkerActive',
  circle: 'MarkerCircle',
};

const Marker = ({type = 'inactive', ...props}: MarkerProps) => {
  return (
    <NaverMapMarkerOverlay width={30} height={30} {...props}>
      {/* <Icon name={markerIconName[type]} size={30} /> */}
      <View style={{width: 30, height: 30, backgroundColor: 'red'}} />
    </NaverMapMarkerOverlay>
  );
};

export default Marker;
