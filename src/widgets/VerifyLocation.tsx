import {useGetGymDetailInfo} from '@entities/gym/queries';
import {VerifyMap} from '@entities/verification/ui';
import {VerifyMapBottomSheet} from '@features/verification/ui';
import BottomSheet from '@gorhom/bottom-sheet';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ChallengeRoute} from '@shared/constants';
import {useLayoutEffect, useRef, useState} from 'react';

const VerifyLocation = () => {
  const route = useRoute<RouteProp<ChallengeRoute, 'verify_location'>>();

  const {challengeId} = route.params;

  const [selectedGymId, setSelectedGymId] = useState<number | null>(null);
  const {data} = useGetGymDetailInfo(selectedGymId);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const showTab = (id: number) => {
    setSelectedGymId(id);
    bottomSheetRef.current?.expand();
  };

  const closeTab = () => {
    setSelectedGymId(null);
    bottomSheetRef.current?.collapse();
  };

  return (
    <>
      <VerifyMap
        challengeId={challengeId}
        selectedMarkerIdx={selectedGymId}
        setSelectedMarkerIdx={setSelectedGymId}
        showTab={showTab}
        closeTab={closeTab}
      />
      <VerifyMapBottomSheet
        ref={bottomSheetRef}
        challengeId={challengeId}
        gym={data}
        onClose={() => setSelectedGymId(null)}
      />
    </>
  );
};

export default VerifyLocation;
