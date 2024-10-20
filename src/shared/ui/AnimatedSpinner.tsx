import React, {useEffect, useRef} from 'react';
import {Animated, Easing} from 'react-native';

const AnimatedSpinner = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 무한 회전 애니메이션 시작
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Animated.Image
      source={require('/assets/images/spinner.png')}
      style={{width: 50, height: 50, transform: [{rotate: spin}]}}
    />
  );
};

export default AnimatedSpinner;
