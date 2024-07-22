import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants';

const Button = ({
  onPress,
  style,
  children,
}: {
  onPress?: () => void;
  variation?: 'button' | 'flat';
  style?: StyleSheet.NamedStyles<any>;
  children?: React.ReactNode;
}) => {
  return (
    <View style={styles.button}>
      <Pressable
        onPress={onPress}
        style={({pressed}) => [
          styles.innerContainer,
          pressed && Platform.OS === 'ios' && {opacity: 0.6},
          style?.button,
        ]}
        android_ripple={{
          color: colors.primary300,
        }}>
        <Text style={styles.buttonText}>{children}</Text>
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
  innerContainer: {
    height: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontWeight: '700'},
});

export default Button;
