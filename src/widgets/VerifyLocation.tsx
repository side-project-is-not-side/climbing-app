import {useCurrentLocation} from '@entities/challenge/hooks';
import {useGetGymDetailInfo} from '@entities/gym/queries';
import {VerifyMap} from '@entities/verification/ui';
import {VerifyMapBottomSheet} from '@features/verification/ui';
import BottomSheet from '@gorhom/bottom-sheet';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ChallengeRoute} from '@shared/constants';
import {useRef, useState} from 'react';
import {View} from 'react-native';

const VerifyLocation = () => {
  const route = useRoute<RouteProp<ChallengeRoute, 'verify_location'>>();

  const {currentLocation} = useCurrentLocation();

  const {challengeId} = route.params;

  const [selectedGymId, setSelectedGymId] = useState<number | null>(null);

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
    <View className="flex-1">
      <VerifyMap
        challengeId={challengeId}
        selectedMarkerIdx={selectedGymId}
        setSelectedMarkerIdx={setSelectedGymId}
        showTab={showTab}
        closeTab={closeTab}
        currentLocation={currentLocation}
      />
      {selectedGymId && currentLocation && (
        <VerifyMapBottomSheet
          ref={bottomSheetRef}
          challengeId={challengeId}
          selectedGymId={selectedGymId}
          currentLocation={currentLocation}
          onClose={() => setSelectedGymId(null)}
        />
      )}
    </View>
  );
};

export default VerifyLocation;
