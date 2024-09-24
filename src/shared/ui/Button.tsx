import {colors} from '../constants';
import React from 'react';
import {GestureResponderEvent, Platform, Pressable, StyleSheet, Text, View} from 'react-native';

const Button = ({
  onPress = e => {},
  disabled,
  style,
  children,
}: {
  onPress?: (e: GestureResponderEvent) => void;
  variation?: 'button' | 'flat';
  disabled?: boolean;
  style?: StyleSheet.NamedStyles<any>;
  children?: React.ReactNode;
}) => {
  return (
    <View style={disabled ? styles.disabledButton : styles.button}>
      <Pressable
        onPress={e => {
          !disabled && onPress(e);
        }}
        style={({pressed}) => [
          styles.innerContainer,
          pressed && Platform.OS === 'ios' && {opacity: 0.6},
          style?.button,
        ]}
        android_ripple={{
          color: colors.primary300,
        }}>
        <Text style={disabled ? styles.disabledButtonText : styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary400,
    borderRadius: 100,
    overflow: 'hidden',
  },
  disabledButton: {
    backgroundColor: colors.gray400,
    borderRadius: 100,
    overflow: 'hidden',
  },
  innerContainer: {
    height: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontWeight: '700'},
  disabledButtonText: {color: '#55575B', fontWeight: '700'},
});

export default Button;
