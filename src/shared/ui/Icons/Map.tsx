import * as React from 'react';
import Svg, {Mask, Rect, G, Path} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';
const SvgMap = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <Mask
      id="mask0_1249_2374"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={24}>
      <Rect width={24} height={24} fill={props.color || '#D9D9D9'} />
    </Mask>
    <G mask="url(#mask0_1249_2374)">
      <Path
        d="M12.9 21L10.05 13.95L3 11.1V9.7L21 3L14.3 21H12.9ZM13.55 17.3L17.6 6.4L6.7 10.45L11.6 12.4L13.55 17.3Z"
        fill={props.color || 'white'}
      />
    </G>
  </Svg>
);
export default SvgMap;
