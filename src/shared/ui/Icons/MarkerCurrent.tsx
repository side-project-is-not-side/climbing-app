import * as React from 'react';
import Svg, {Circle, Defs, G} from 'react-native-svg';

/* SVGR has dropped some elements not supported by react-native-svg: filter */
import type {SvgProps} from 'react-native-svg';

const SvgMarkerCurrent = (props: SvgProps) => (
  <Svg
    viewBox="0 0 30 30"
    fill="none"
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <G filter="url(#filter0_d_1043_631)">
      <Circle cx={15} cy={15} r={10} fill={props.color || 'white'} />
    </G>
    <Circle cx={15} cy={15} r={7} fill={props.color || '#FF5544'} />
    <Defs></Defs>
  </Svg>
);
export default SvgMarkerCurrent;
