import * as React from 'react';
import Svg, {G, Path, Defs, ClipPath, Rect} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';
const SvgNaver = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <G clipPath="url(#clip0_1249_1734)">
      <Path
        d="M24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12Z"
        fill="#03C75A"
      />
      <Path
        d="M13.56 12.3087L10.3143 7.65723H7.62286V16.3429H10.44V11.6915L13.6857 16.3429H16.3771V7.65723H13.56V12.3087Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1249_1734">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgNaver;
