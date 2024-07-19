'use client';
import {useState} from 'react';
import {ChallengeStatus} from '../type';

export const useTab = () => {
  const [tabState, setTabState] = useState<ChallengeStatus>('NOT_STARTED');

  const handleTabPress = (tab: ChallengeStatus) => {
    setTabState(tab);
  };

  return {tabState, handleTabPress};
};
