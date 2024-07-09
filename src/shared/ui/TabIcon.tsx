import React from 'react';
import {Icon, IconProps} from './Icon/Icon';

const TabIcon = React.memo((props: IconProps) => {
  const {name, focused} = props;
  return <Icon name={name} size={24} color={focused ? '#f54' : '#fff'} />;
});

export default TabIcon;
