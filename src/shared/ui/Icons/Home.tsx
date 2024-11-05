import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgHome = (props: SvgProps) => <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={props.width || 24} height={props.height || 24} style={props.style || {}} {...props}><Path d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V15H11V21H4Z" fill={props.color || '#FF5544'} /></Svg>;
export default SvgHome;