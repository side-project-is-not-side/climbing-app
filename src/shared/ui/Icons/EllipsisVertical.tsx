import Svg, {Circle} from 'react-native-svg';
import type {SvgProps} from 'react-native-svg';

const SvgEllipsisVertical = (props: SvgProps) => (
  <Svg
    width={props.width || 24}
    height={props.height || 24}
    style={props.style || {}}
    {...props}>
    <Circle cx="12" cy="6" r="1.3" fill={"#fff"} />
    <Circle cx="12" cy="12" r="1.3" fill={"#fff"} />
    <Circle cx="12" cy="18" r="1.3" fill={"#fff"} />
  </Svg>
);

export default SvgEllipsisVertical;
