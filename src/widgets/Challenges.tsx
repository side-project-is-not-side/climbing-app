import {useTab} from '../entities/challenge/hooks';
import {useGetChallenge} from '../entities/challenge/queries/useGetChallenge';
import {CardList, Tabs} from '../entities/challenge/ui';
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

  return (
    <>
      <Tabs tabState={tabState} handleTabPress={handleTabPress} />
      {challenges.length ? (
        <CardList data={challenges} tabState={tabState} handlePaging={handlePaging} />
      ) : (
        <View className="justify-center items-center flex-1">
          <Text className="text-grayscale-300">{tabType()} 챌린지가 없습니다.</Text>
        </View>
      )}
    </>
  );
};

export default Challenges;
