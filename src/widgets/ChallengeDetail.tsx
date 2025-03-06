import {useGetChallengeDetail} from '../entities/challenge/queries/useGetChallengeDetail';
import {ChallengeInfo} from '../entities/challenge/ui';
import {VerificationHistoryPreview} from '../entities/verification/ui';
import {ChallengeRoute} from '../shared/constants';
import {Button} from '../shared/ui';
import {usePostChallenge} from '@entities/challenge/queries/usePostChallenge';
import ChallengeGuideTab from '@entities/challenge/ui/ChallengeGuideTab';
import BottomSheet from '@gorhom/bottom-sheet';
import {RouteProp, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect, useRef} from 'react';
import {ScrollView, View} from 'react-native';

const ChallengeDetail = () => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const route = useRoute<RouteProp<ChallengeRoute, 'challenge_detail'>>();

  const {challengeId, activityType} = route.params;

  const {data: challenge} = useGetChallengeDetail(challengeId, activityType);
  const {trigger} = usePostChallenge(challengeId, activityType);

  const isStarted = (challenge?.activityCount || 0) > 0;
  const isSuccess = challenge && challenge.activityCount === challenge.successCount;

  const showTab = () => {
    bottomSheetRef.current?.expand();
  };

  const startChallenge = () => trigger({});

  useLayoutEffect(() => {
    bottomSheetRef.current?.collapse();
  });
  return (
    <>
      <ScrollView className="flex-1">
        <View className="px-5">
          <ChallengeInfo challenge={challenge} isStarted={isStarted} />
          {challenge && (
            <VerificationHistoryPreview
              challengeId={challenge.id}
              challengeTitle={challenge.title || ''}
              activityType={challenge.activityType}
              isCompleted={challenge.activityCount === challenge.successCount}
              recentActivities={challenge.records || []}
            />
          )}
        </View>
      </ScrollView>
      <View
        style={{
          padding: 20,
        }}>
        <Button onPress={isStarted ? showTab : startChallenge} disabled={isSuccess}>
          {isStarted ? '인증하기' : '시작하기'}
        </Button>
      </View>
      {challenge && (
        <ChallengeGuideTab
          ref={bottomSheetRef}
          activityType={challenge.activityType}
          challengeTitle={challenge.title}
          challengeId={challenge.id}
        />
      )}
    </>
  );
};

export default ChallengeDetail;
