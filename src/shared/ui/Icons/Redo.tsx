import * as React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgRedo = (props: SvgProps) => (
  <Svg
    viewBox="0 0 16 16"
    fill="none"
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <Mask id="mask0_3215_4900" maskUnits="userSpaceOnUse" x={0} y={0} width={16} height={16}>
      <Rect width={16} height={16} fill={props.color || '#D9D9D9'} />
    </Mask>
    <G mask="url(#mask0_3215_4900)">
      <Path
        d="M7.99965 14C10.9452 14 13.333 11.6122 13.333 8.66665C13.333 5.72113 10.9452 3.33331 7.99965 3.33331C6.01932 3.33331 4.29108 4.41264 3.37109 6.01512"
        stroke="#070707"
        strokeWidth={1.33333}
      />
      <Path d="M2.66667 8.66669C2.66667 11.6122 5.05448 14 8 14" stroke="#070707" strokeWidth={1.33333} />
      <Path d="M3.33301 2V6H7.33301" stroke="#070707" strokeWidth={1.33333} strokeLinecap="round" />
    </G>
  </Svg>
);
export default SvgRedo;
