


import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgChevronLeft = (props: SvgProps) => (
  <Svg width={props.width || 24}
        height={props.height || 24}
        viewBox="0 0 9 14" fill="none" style={props.style || {}} {...props}>
    <Path d="M7 0L0 7L7 14L8.2425 12.7575L2.485 7L8.2425 1.2425L7 0Z" fill={props.color || 'white'} />
  </Svg>
);
export default SvgChevronLeft;
