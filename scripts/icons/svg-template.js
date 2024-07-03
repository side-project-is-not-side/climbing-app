const imports = `
import * as React from 'react';
import Svg, {Path, Circle, Polygon, Rect, Line, Ellipse, G} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';
`;

const template = (variables, {tpl}) => {
  return tpl`
${variables.imports};
${variables.interfaces};
const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);
${variables.exports};
`;
};

module.exports = template;
