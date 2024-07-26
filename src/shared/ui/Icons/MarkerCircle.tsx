import React from 'react';
import Svg, {G, Circle, Defs} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgMarkerCircle = (props: SvgProps) => {
  return (
    <Svg
      width={props.width || 24}
      height={props.height || 24}
      style={props.style || {}}
      viewBox="0 0 30 30"
      fill="none">
      <G filter="url(#filter0_d_1115_2217)">
        <Circle cx="15" cy="15" r="10" fill="white" />
      </G>
      <Circle cx="15" cy="15" r="7" fill="#FF5544" />
    </Svg>
  );
};

export default SvgMarkerCircle;
