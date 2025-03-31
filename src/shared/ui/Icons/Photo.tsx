import * as React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgPhoto = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <Mask
      id="mask0_3660_14840"
      style={{maskType: 'alpha'}}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="24"
      height="24">
      <Rect width="24" height="24" fill={props.color || '#D9D9D9'} />
    </Mask>
    <G mask="url(#mask0_3660_14840)">
      <Path
        d="M5 21C4.45 21 3.97917 20.8042 3.5875 20.4125C3.19583 20.0208 3 19.55 3 19V5C3 4.45 3.19583 3.97917 3.5875 3.5875C3.97917 3.19583 4.45 3 5 3H19C19.55 3 20.0208 3.19583 20.4125 3.5875C20.8042 3.97917 21 4.45 21 5V19C21 19.55 20.8042 20.0208 20.4125 20.4125C20.0208 20.8042 19.55 21 19 21H5ZM5 19H19V5H5V19ZM6 17H18L14.25 12L11.25 16L9 13L6 17Z"
        fill="white"
      />
    </G>
  </Svg>
);

export default SvgPhoto;
