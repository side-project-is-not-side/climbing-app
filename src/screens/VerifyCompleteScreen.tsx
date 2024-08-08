import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useLayoutEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CHALLENGE_ROUTES, ChallengeRoute, colors} from '../shared/constants';
import {formatKST} from '../shared/utils';

type ScreenProps = NativeStackScreenProps<ChallengeRoute, 'verify_complete'>;

const VerifyCompleteScreen = ({route, navigation}: ScreenProps) => {
  const image = route.params.image;
  const challengeId = route.params.challengeId;


  const pageOut = () => {
    setTimeout(() => {
      navigation.navigate(CHALLENGE_ROUTES.CHALLENGE_DETAIL, {
        challengeId
      });
    }, 1500);
  }
  return (
    <View style={styles.root}>
      <Image source={image} style={styles.image} onLoadEnd={pageOut} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>인증 완료</Text>
        <Text style={styles.verifyDate}>
          {image.timestamp && formatKST(new Date(image.timestamp))}
        </Text>
        <Text style={styles.message}>계속 도전해보자구 부리!</Text>
      </View>
    </View>
  );
};

export default VerifyCompleteScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  image: {
    width: 160,
    height: 160,
    resizeMode: 'cover',
    borderRadius: 8
  },
  textContainer: {
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  verifyDate: {
    fontSize: 14,
    color: colors.black,
  },
  message: {
    fontSize: 16,
    color: colors.gray400,
  },
});
