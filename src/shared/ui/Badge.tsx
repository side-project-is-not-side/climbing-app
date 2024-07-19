import {
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {colors} from '../constants';

type Props = {
  text: string | React.ReactNode;
  style?: {
    badge?: ViewStyle | TextStyle | ImageStyle;
    text?: ViewStyle | TextStyle | ImageStyle;
  };
};

const Badge = ({text, style}: Props) => {
  return (
    <View style={[styles.badge, style?.badge]}>
      <Text style={[styles.badgeText, style?.text]}>{text}</Text>
    </View>
  );
};

export default Badge;

const styles = StyleSheet.create({
  badge: {
    padding: 2,
    width: 86,
    borderRadius: 200,
    backgroundColor: colors.primary400,
  },
  badgeText: {
    textAlign: 'center',
    color: '#fff',
  },
});
