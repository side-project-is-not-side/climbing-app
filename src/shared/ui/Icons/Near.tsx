import * as React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgNear = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <G id="near_me">
      <Mask
        id="mask0_127_4087"
        style={{
          maskType: 'alpha',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={24}
        height={24}>
        <Rect id="Bounding box" width={24} height={24} fill={props.color || '#D9D9D9'} />
      </Mask>
      <G mask="url(#mask0_127_4087)">
        <Path
          id="near_me_2"
          d="M12.9 21L10.05 13.95L3 11.1V9.7L21 3L14.3 21H12.9ZM13.55 17.3L17.6 6.4L6.7 10.45L11.6 12.4L13.55 17.3Z"
          fill={props.color || 'white'}
        />
      </G>
    </G>
  </Svg>
);
export default SvgNear;
