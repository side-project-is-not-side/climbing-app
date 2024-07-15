import React from 'react';
import {Platform, Pressable, StyleSheet, Text, View} from 'react-native';

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
          color: '#F59C9C',
        }}>
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF5544',
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
