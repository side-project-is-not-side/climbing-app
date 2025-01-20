import {Icon} from '@shared/ui';
import React, {ComponentProps, PropsWithChildren} from 'react';
import {Pressable, Text, View} from 'react-native';

type Icon = 'Apple' | 'Google' | 'Kakao' | 'Naver' | 'Guest';

type Props = PropsWithChildren &
  ComponentProps<typeof Pressable> & {
    icon: Icon;
  };

const LoginButton = ({children, icon, ...props}: Props) => {
  const isDisabled = props.disabled;
  return (
    <Pressable
      {...props}
      className={`bg-[#070707] rounded-lg px-6 py-4 relative ${isDisabled ? 'opacity-60' : ''} ${props.className}`}>
      <View className="absolute -translate-y-3 top-[30px] left-6">
        {icon === 'Guest' ? (
          <View className="bg-red-900 flex justify-center items-center px-2.5 py-0.5 rounded-xl">
            <Text className="text-white text-sm">체험용</Text>
          </View>
        ) : (
          <Icon name={icon} />
        )}
      </View>
      <Text className="text-white text-center font-bold text-lg">{children}</Text>
    </Pressable>
  );
};

export default LoginButton;
