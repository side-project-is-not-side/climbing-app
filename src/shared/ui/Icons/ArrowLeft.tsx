import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgArrowLeft = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <G clipPath="url(#clip0_3215_7340)">
      <Path d="M15 5L8 12L15 19L16.2425 17.7575L10.485 12L16.2425 6.2425L15 5Z" fill={props.color || 'white'} />
    </G>
    <Defs>
      <ClipPath id="clip0_3215_7340">
        <Rect width={24} height={24} fill={props.color || 'white'} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgArrowLeft;
