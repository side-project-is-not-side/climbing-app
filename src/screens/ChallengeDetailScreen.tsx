import {ChallengeDetail} from '../widgets';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ChallengeRoute} from '@shared/constants';
import {AttendanceChallenge} from '@widgets/challenge';
import React from 'react';

const ChallengeDetailScreen = () => {
  const route = useRoute<RouteProp<ChallengeRoute, 'challenge_detail'>>();

  const {activityType, challengeId} = route.params;

  if (activityType === 'ATTENDANCE') {
    return <AttendanceChallenge challengeId={challengeId} activityType={activityType} />;
  }

  return <ChallengeDetail challengeId={challengeId} activityType={activityType} />;
};

export default ChallengeDetailScreen;
