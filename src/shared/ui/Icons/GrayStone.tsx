import * as React from 'react';
import Svg, {Circle, G, Path} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgGrayStone = (props: SvgProps) => (
  <Svg
    viewBox="0 0 20 20"
    fill="none"
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <G id="Group 473">
      <G id="Group 463">
        <G id="Group 457">
          <Path
            id="Vector"
            d="M1.0172 7.19631C1.19213 9.06746 3.07473 10.2868 3.82132 12.0111C4.37423 13.2877 4.27531 14.7819 4.88237 16.0325C5.94966 18.2316 9.10885 18.8918 11.1987 17.6235C11.9171 17.1872 12.5419 16.5677 13.3458 16.3209C14.539 15.9544 15.8562 16.4917 17.0693 16.1928C18.651 15.8034 19.5881 14.0551 19.5933 12.4266C19.5985 10.798 18.8926 9.26113 18.2012 7.78671C17.1911 5.63337 15.9989 3.29991 13.8029 2.38568C11.3746 1.37461 8.89123 2.63558 6.45676 2.94692C4.13162 3.24472 0.728769 4.11209 1.0172 7.19527V7.19631Z"
            fill="#8B8D8E"
          />
          <Circle id="Ellipse 23" cx={6.46662} cy={6.7652} r={0.676821} fill="#222427" />
          <Circle id="Ellipse 24" cx={15.3174} cy={9.47248} r={0.676821} fill="#222427" />
          <Circle id="Ellipse 22" cx={10.6318} cy={9.4726} r={1.4057} fill="black" />
        </G>
      </G>
    </G>
  </Svg>
);
export default SvgGrayStone;
