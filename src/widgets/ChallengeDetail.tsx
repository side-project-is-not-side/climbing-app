import {ActivityType, ChallengeGuideTab, ChallengeInfo, useGetChallengeDetail} from '@entities/challenge';
import VerificationHistoryPreview from '@features/verification/ui/preview/VerificationHistoryPreview';
import BottomSheet from '@gorhom/bottom-sheet';
import {Button} from '@shared/ui';
import React, {useLayoutEffect, useRef} from 'react';
import {ScrollView, View} from 'react-native';

type Props = {
  challengeId: number;
  activityType: ActivityType;
};

const ChallengeDetail = ({challengeId, activityType}: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const {data: challenge} = useGetChallengeDetail(challengeId, activityType);
  const isSuccess = challenge && challenge.activityCount === challenge.successCount;

  const showTab = () => {
    bottomSheetRef.current?.expand();
  };

  useLayoutEffect(() => {
    bottomSheetRef.current?.collapse();
  });

  return (
    <>
      <ScrollView className="flex-1">
        <View className="px-5">
          <ChallengeInfo challenge={challenge} />
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
        <Button onPress={showTab} disabled={isSuccess}>
          인증하기
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
