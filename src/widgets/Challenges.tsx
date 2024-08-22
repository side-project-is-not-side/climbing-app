import React, {useMemo, useState} from 'react';
import {CardList, Tabs} from '../entities/challenge/ui';
import {useTab} from '../entities/challenge/hooks';
import {useGetChallenge} from '../entities/challenge/queries/useGetChallenge';

const PAGE_SIZE = 10;

const Challenges = () => {
  const [page, setPage] = useState(0);
  const {tabState, handleTabPress} = useTab();

  const {data} = useGetChallenge(tabState, page, PAGE_SIZE);
  const challenges = useMemo(() => {
    const reduced = data
    ? data.reduce((acc, pageData) => [...acc, ...pageData], [])
    : [];
    return reduced;
  }, [data]);

  const handlePaging = () => {
    if (!data || data[data?.length - 1]?.length < PAGE_SIZE) return;
    setPage(page => page + 1);
  };

  return (
    <>
      <Tabs tabState={tabState} handleTabPress={handleTabPress} />
      <CardList data={challenges} handlePaging={handlePaging} />
    </>
  );
};

export default Challenges;