import * as React from 'react';
import Svg, {G, Mask, Path, Rect} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgShare = (props: SvgProps) => (
  <Svg
    viewBox="0 0 20 20"
    fill="none"
    width={props.width || 20}
    height={props.height || 20}
    style={props.style || {}}
    {...props}>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M3.77778 9.11111V15.3333C3.77778 15.5691 3.87143 15.7952 4.03813 15.9619C4.20483 16.1286 4.43092 16.2222 4.66667 16.2222H15.3333C15.5691 16.2222 15.7952 16.1286 15.9619 15.9619C16.1286 15.7952 16.2222 15.5691 16.2222 15.3333V9.11111H18V15.3333C18 16.0406 17.719 16.7189 17.219 17.219C16.7189 17.719 16.0406 18 15.3333 18H4.66667C3.95942 18 3.28115 17.719 2.78105 17.219C2.28095 16.7189 2 16.0406 2 15.3333V9.11111H3.77778Z"
      fill="white"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.37146 2.26035C9.71859 1.91322 10.2814 1.91322 10.6285 2.26035L14.8126 6.44444L13.5556 7.70152L10 4.14597L6.44444 7.70152L5.18737 6.44444L9.37146 2.26035Z"
      fill="white"
    />
    <Path fill-rule="evenodd" clip-rule="evenodd" d="M10.8889 2.88889V13.5556H9.11111V2.88889H10.8889Z" fill="white" />
  </Svg>
);

export default SvgShare;
