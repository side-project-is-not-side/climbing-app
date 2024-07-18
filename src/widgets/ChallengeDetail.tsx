import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {Progress} from '../entities/challenge/ui';
import {VerificationHistoryPreview} from '../entities/verification/ui';
import {CHALLENGE_ROUTES, ChallengeRoute} from '../app/navigation';
import Button from '../shared/ui/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ChallengeInfo from '../entities/challenge/ui/ChallengeInfo';

const ChallengeDetail = () => {
  const route = useRoute<RouteProp<ChallengeRoute, 'challenge_detail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const handleNavigateVerify = () => {
    // navigation.navigate(CHALLENGE_ROUTES.VERIFY_PHOTO, {
    //   challengeTitle: '챌린지 명',
    // });
  };

  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <ChallengeInfo />
        <Progress />
        <VerificationHistoryPreview />
        <Button onPress={handleNavigateVerify}>인증하기</Button>
      </View>
    </ScrollView>
  );
};

export default ChallengeDetail;

const styles = StyleSheet.create({
  pageContainer: {
    padding: 20,
  },
  progressImageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  challengeInfoContainer: {
    marginVertical: 20,
  },
  type: {
    marginBottom: 4,
    color: 'red',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 34,
  },
});
