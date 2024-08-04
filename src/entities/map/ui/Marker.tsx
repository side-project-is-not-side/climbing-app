import {
  NaverMapMarkerOverlay,
  NaverMapMarkerOverlayProps,
} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {Icon} from '../../../shared/ui';
import {MarkerType} from '../types';
import {IconName} from '../../../shared/ui/Icon/Icon';

type MarkerProps = {type?: MarkerType} & Omit<
  NaverMapMarkerOverlayProps,
  'width' | 'height'
>;

const markerIconName: Record<MarkerType, IconName> = {
  disabled: 'MarkerDisabled',
  inactive: 'MarkerInactive',
  active: 'MarkerActive',
};

const Marker = ({type = 'inactive', ...props}: MarkerProps) => {
  return (
    <NaverMapMarkerOverlay width={30} height={30} {...props}>
      <Icon name={markerIconName[type]} size={30} />
    </NaverMapMarkerOverlay>
  );
};

export default Marker;
