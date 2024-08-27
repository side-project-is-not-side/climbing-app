import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Progress, ChallengeInfo } from '../entities/challenge/ui';
import { VerificationHistoryPreview } from '../entities/verification/ui';
import { ChallengeRoute, CHALLENGE_ROUTES } from '../shared/constants';
import { Button } from '../shared/ui';
import { useGetChallengeDetail } from '../entities/challenge/queries/useGetChallengeDetail';

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
      <ScrollView className='flex-1'>
        <View className='px-5'>
          <ChallengeInfo challenge={challenge} />
          <VerificationHistoryPreview challengeId={challenge?.id} challengeTitle={challenge?.title || ""} recentActivities={challenge?.activities || []} />
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