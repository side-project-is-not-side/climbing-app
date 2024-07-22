import * as React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';
const SvgX = (props: SvgProps) => (
  <Svg viewBox="0 0 24 24" fill="none" style={props.style || {}} {...props}>
    <Mask
      id="mask0_1106_2521"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width={props.width || 24}
      height={props.height || 24}>
      <Rect width="24" height="24" fill={'#D9D9D9'} />
    </Mask>
    <G mask="url(#mask0_1106_2521)">
      <Path
        d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
        fill={props.color || 'white'}
      />
    </G>
  </Svg>
);
export default SvgX;
