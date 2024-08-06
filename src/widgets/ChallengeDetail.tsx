import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Progress, ChallengeInfo} from '../entities/challenge/ui';
import {VerificationHistoryPreview} from '../entities/verification/ui';
import {ChallengeRoute, CHALLENGE_ROUTES} from '../shared/constants';
import {Button} from '../shared/ui';
import {useGetChallengeDetail} from '../entities/challenge/api/useGetChallengeDetail';

const ChallengeDetail = () => {
  const route = useRoute<RouteProp<ChallengeRoute, 'challenge_detail'>>();
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const {data: challenge} = useGetChallengeDetail(route.params.challengeId);

  const handleNavigateVerify = () => {
    switch (challenge?.activityType) {
      case 'PICTURE':
        return navigation.navigate(CHALLENGE_ROUTES.VERIFY_GUIDE, {
          challengeTitle: challenge?.title,
          challengeId: challenge?.id,
        });
      case 'LOCATION':
        return navigation.navigate(CHALLENGE_ROUTES.VERIFY_LOCATION, {
          challengeTitle: challenge?.title,
          challengeId: challenge?.id,
        });
    }
  };

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <View style={styles.pageContainer}>
          <ChallengeInfo challenge={challenge} />
          <Progress
            activityCount={challenge?.activityCount}
            successCount={challenge?.successCount}
          />
          {!!challenge?.activities.length && <VerificationHistoryPreview />}
          <VerificationHistoryPreview />
        </View>
      </ScrollView>
      <View
        style={{
          padding: 20,
        }}>
        <Button onPress={handleNavigateVerify}>인증하기</Button>
      </View>
    </>
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
