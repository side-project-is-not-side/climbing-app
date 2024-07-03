import React from 'react';
import * as Icons from '../Icons';

type IconName = keyof typeof Icons;
type IconsProps = (typeof Icons)[IconName];
type IconProps = Omit<IconsProps, 'size' | 'color'> & {
  name: IconName;
  size?: number;
  onClick?: (...args: any) => void;
  [key: string]: any;
};

export const Icon = (props: IconProps) => {
  const {name, size = 24, ...rest} = props;

  const Component = Icons[name];

  return <Component width={size} height={size} {...rest} />;
};
