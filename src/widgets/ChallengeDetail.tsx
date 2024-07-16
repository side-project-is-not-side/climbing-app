import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Text, View, StyleSheet, Image, ScrollView} from 'react-native';
import {Progress} from '../entities/challenge/ui';
import {VerificationHistoryPreview} from '../entities/verification/ui';
import {CHALLENGE_ROUTES, ChallengeRoute} from '../app/navigation';
import Button from '../shared/ui/Button';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const ChallengeDetail = () => {
  const route = useRoute<RouteProp<ChallengeRoute, 'challenge_detail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const handleNavigateVerify = () => {
    navigation.navigate(CHALLENGE_ROUTES.VERIFY_PHOTO, {
      challengeTitle: '챌린지 명',
    });
  };

  return (
    <ScrollView>
      <View style={styles.pageContainer}>
        <View style={styles.progressImageContainer}>
          <Image
            source={require('../../assets/images/fire_full.png')}
            alt="challenge progress image"
          />
        </View>
        <View style={styles.challengeInfoContainer}>
          <Text style={styles.type}>암장 도전</Text>
          <Text style={styles.title}>암장의 고인물</Text>
          <Text>
            같은 암장을 20번이나 갔더니 생긴 변화, {'\n'}이 암장의 고인물이
            되었다.!!!!!!
          </Text>
        </View>
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
