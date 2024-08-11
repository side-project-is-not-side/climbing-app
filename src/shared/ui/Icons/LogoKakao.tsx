import * as React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgLogoKakao = (props: SvgProps) => (
  <Svg
    viewBox="0 0 24 24"
    fill="none"
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <G clipPath="url(#clip0_1249_2915)">
      <Path
        d="M24 22.125C24 23.1606 23.1606 24 22.125 24H1.875C0.839438 24 0 23.1606 0 22.125V1.875C0 0.839438 0.839438 0 1.875 0H22.125C23.1606 0 24 0.839438 24 1.875V22.125Z"
        fill="#FFE812"
      />
      <Path
        d="M12 3.375C6.61519 3.375 2.25 6.81684 2.25 11.0625C2.25 13.8074 4.07494 16.2159 6.82013 17.576C6.67078 18.091 5.86041 20.8895 5.82816 21.1093C5.82816 21.1093 5.80875 21.2745 5.91572 21.3375C6.02269 21.4005 6.1485 21.3516 6.1485 21.3516C6.45525 21.3087 9.70566 19.0255 10.2682 18.6291C10.8303 18.7087 11.409 18.75 12 18.75C17.3848 18.75 21.75 15.3082 21.75 11.0625C21.75 6.81684 17.3848 3.375 12 3.375Z"
        fill="black"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1249_2915">
        <Rect width={24} height={24} fill={props.color || 'white'} />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgLogoKakao;
