'use client';
import {useState} from 'react';

export type TabState = 'NOT_STARTED' | 'ONGOING' | 'SUCCESS';

export const useTab = () => {
  const [tabState, setTabState] = useState<TabState>('NOT_STARTED');

  const handleTabPress = (tab: TabState) => {
    setTabState(tab);
  };

  return {tabState, handleTabPress};
};
