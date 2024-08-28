import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgDropdownArrow = (props: SvgProps) => (
  <Svg
    viewBox="0 0 20 20"
    fill="none"
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <Path d="M15 8L10 12L5 8" stroke={props.color || 'white'} />
  </Svg>
);
export default SvgDropdownArrow;
