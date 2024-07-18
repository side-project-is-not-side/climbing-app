import React, {useMemo, useState} from 'react';
import {CardList, Tabs} from '../entities/challenge/ui';
import {useTab} from '../entities/challenge/hooks';
import {useGetChallenge} from '../entities/challenge/api/useGetChallenge';
import {Button} from 'react-native';

const Challenges = () => {
  const [page, setPage] = useState(0);
  const {tabState, handleTabPress} = useTab();
  // const {data} = useGetChallenge(tabState, page);
  // const challenges = data;

  const {data} = useGetChallenge(tabState, page);

  const challenges = useMemo(() => {
    const reduced = data
      ? data.reduce((acc, pageData) => [...acc, ...pageData], [])
      : [];
    return reduced;
  }, [data]);

  return (
    <>
      <Tabs tabState={tabState} handleTabPress={handleTabPress} />
      <CardList data={challenges} />
      {/* <Button
        title="+"
        onPress={() => {
          if (!data || data[data?.length - 1]?.length < 10) return;
          setPage(page + 1);
        }}
      /> */}
    </>
  );
};

export default Challenges;
