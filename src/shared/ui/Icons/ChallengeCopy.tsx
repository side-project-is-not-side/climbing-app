import * as React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgChallengeCopy = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 25"
    fill="none"
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <Mask
      id="mask0_1082_366"
      style={{
        maskType: 'alpha',
      }}
      maskUnits="userSpaceOnUse"
      x={0}
      y={0}
      width={24}
      height={25}>
      <Rect y={0.817383} width={24} height={24} fill={props.color || '#D9D9D9'} />
    </Mask>
    <G mask="url(#mask0_1082_366)">
      <Path
        d="M6 23.8174V15.5924L2.75 10.3174L7.375 2.81738H16.625L21.25 10.3174L18 15.5924V23.8174L12 21.8174L6 23.8174ZM8 21.0424L12 19.7174L16 21.0424V17.8174H8V21.0424ZM8.5 4.81738L5.1 10.3174L8.5 15.8174H15.5L18.9 10.3174L15.5 4.81738H8.5ZM10.95 14.3924L7.4 10.8674L8.825 9.44238L10.95 11.5674L15.175 7.31738L16.6 8.71738L10.95 14.3924Z"
        fill={props.color || 'white'}
      />
    </G>
  </Svg>
);
export default SvgChallengeCopy;
