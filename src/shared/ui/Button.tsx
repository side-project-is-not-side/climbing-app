import {colors} from '../constants';
import React from 'react';
import {GestureResponderEvent, Platform, Pressable, StyleSheet, Text, View} from 'react-native';

const Button = ({
  onPress = e => {},
  disabled,
  variation = 'default',
  size = 'md',
  children,
  classNames = {
    inner: '',
    outter: '',
  },
}: {
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  variation?: 'default' | 'outline';
  size?: 'md' | 'lg';
  children?: React.ReactNode;
  classNames?: {
    inner?: string;
    outter?: string;
  };
}) => {
  const buttonTheme = {
    default: {container: 'bg-primary-400', text: 'text-white'},
    disabled: {container: 'bg-grayscale-600', text: 'text-grayscale-500'},
    outline: {container: 'border border-primary-400', text: 'text-primary-400'},
  };

  const buttonSize = {
    md: 'py-4 px-4',
    lg: 'py-4 px-10',
  };

  return (
    <View
      style={{
        overflow: 'hidden',
        borderRadius: 100,
      }}
      className={buttonTheme[disabled ? 'disabled' : variation].container + ' ' + classNames?.outter}>
      <Pressable
        onPress={e => {
          !disabled && onPress(e);
        }}
        className={`${buttonSize[size]} justify-center items-center ` + ' ' + classNames?.inner}
        style={({pressed}) => pressed && Platform.OS === 'ios' && {opacity: 0.6}}
        android_ripple={{
          color: disabled ? colors.gray700 : colors.primary300,
        }}>
        <Text style={{fontWeight: 700, fontSize: 16}} className={buttonTheme[disabled ? 'disabled' : variation].text}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
};

export default Button;
