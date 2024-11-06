import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgArrowBack = (props: SvgProps) => <Svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" width={props.width || 24} height={props.height || 24} style={props.style || {}} {...props}><Path d="M12.399 4.16658L6.56567 9.99992L12.399 15.8333L13.4344 14.7978L8.63651 9.99992L13.4344 5.202L12.399 4.16658Z" fill={props.color || 'white'} /></Svg>;
export default SvgArrowBack;