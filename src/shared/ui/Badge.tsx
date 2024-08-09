import {
  Text,
  View,
} from 'react-native';

type Props = {
  text: string | React.ReactNode;
  className?: string
  textClassName? : string
};

const Badge = ({text, className, textClassName}: Props) => {
  return (
    <View className={"py-1 w-[86px] rounded-full bg-[#333539] " + className}>
      <Text className={"text-white text-center " + textClassName}>{text}</Text>
    </View>
  );
};

export default Badge;