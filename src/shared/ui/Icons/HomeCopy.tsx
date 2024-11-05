import * as React from "react";
import Svg, { G, Mask, Rect, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgHomeCopy = (props: SvgProps) => <Svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width={props.width || 24} height={props.height || 24} style={props.style || {}} {...props}><G id="home"><Mask id="mask0_102_1885" style={{
      maskType: "alpha"
    }} maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}><Rect id="Bounding box" width={24} height={24} fill={props.color || '#D9D9D9'} /></Mask><G mask="url(#mask0_102_1885)"><Path id="home_2" d="M6 19H9V13H15V19H18V10L12 5.5L6 10V19ZM4 21V9L12 3L20 9V21H13V15H11V21H4Z" fill={props.color || 'white'} /></G></G></Svg>;
export default SvgHomeCopy;