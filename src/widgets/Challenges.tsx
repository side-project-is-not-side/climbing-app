import {useTab} from '../entities/challenge/hooks';
import {useGetChallenge} from '../entities/challenge/queries/useGetChallenge';
import {CardList, Tabs} from '../entities/challenge/ui';
import * as amplitude from '@amplitude/analytics-react-native';
import {Button} from '@shared/ui';
import React, {useMemo, useState} from 'react';
import {Text, View} from 'react-native';

const PAGE_SIZE = 10;

const Challenges = () => {
  const [page, setPage] = useState(0);
  const {tabState, handleTabPress} = useTab();

  const {data} = useGetChallenge(tabState, page, PAGE_SIZE);
  const challenges = useMemo(() => {
    const reduced = data ? data.reduce((acc, pageData) => [...acc, ...pageData], []) : [];
    return reduced;
  }, [data]);

  const handlePaging = () => {
    if (!data || data[data?.length - 1]?.length < PAGE_SIZE) return;
    setPage(page => page + 1);
  };

  const tabType = () => {
    switch (tabState) {
      case 'NOT_STARTED':
        return '참여 가능한';
      case 'ONGOING':
        return '진행중인';
      case 'SUCCESS':
        return '완료 된';
    }
  };

  const handleInitButton = () => {
    amplitude.track('챌린지 시작하기 버튼 클릭');
    handleTabPress('NOT_STARTED');
  };

  return (
    <>
      <Tabs tabState={tabState} handleTabPress={handleTabPress} />
      {challenges.length ? (
        <CardList data={challenges} tabState={tabState} handlePaging={handlePaging} />
      ) : (
        <View className="justify-center items-center flex-1">
          <Text className="text-base text-grayscale-500">{tabType()} 도전이 없어요</Text>
          <Text className="text-base text-grayscale-500">근처 암장에 가서 그랩을 불태워보자!</Text>
          <Button variation="outline" size="lg" classNames={{outter: 'mt-6'}} onPress={handleInitButton}>
            챌린지 시작하기
          </Button>
        </View>
      )}
    </>
  );
};

export default Challenges;
