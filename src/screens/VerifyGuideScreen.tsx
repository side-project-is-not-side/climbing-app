import React, {useLayoutEffect} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {CHALLENGE_ROUTES, ChallengeRoute} from '../shared/constants';
import {Button, ModalLayout} from '../shared/ui';
import {VerifyGuide} from '../entities/verification/ui';

type ScreenProps = NativeStackScreenProps<ChallengeRoute, 'verify_guide'>;

const VerifyGuideScreen = ({route, navigation}: ScreenProps) => {
  const challengeTitle = route.params?.challengeTitle;
  const challengeId = route.params?.challengeId;

  const handleNavigate = () => {
    navigation.replace(CHALLENGE_ROUTES.VERIFY_PHOTO, {
      challengeTitle,
      challengeId,
    });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Pressable onPress={navigation.goBack} style={styles.header} />
      ),
    });
  }, []);
  return (
    <ModalLayout>
      <VerifyGuide />
      <Button onPress={handleNavigate}>인증하기</Button>
    </ModalLayout>
  );
};

export default VerifyGuideScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    width: '100%',
    height: '100%',
  },
});