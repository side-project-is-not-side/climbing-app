import {useGetGymDetailInfo} from '@entities/gym/queries';
import {VerifyMap} from '@entities/map/ui';
import {VerifyMapBottomSheet} from '@features/verification/ui';
import BottomSheet from '@gorhom/bottom-sheet';
import {useRef, useState} from 'react';

const VerifyLocation = () => {
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
        showTab={showTab}
        selectedMarkerIdx={selectedGymId}
        setSelectedMarkerIdx={setSelectedGymId}
        closeTab={closeTab}
      />
      <VerifyMapBottomSheet ref={bottomSheetRef} gym={data} onClose={() => setSelectedGymId(null)} />
    </>
  );
};

export default VerifyLocation;
