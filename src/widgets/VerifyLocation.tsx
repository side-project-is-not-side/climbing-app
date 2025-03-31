import {ChallengeGym, useGetChallengeGyms} from '@entities/challenge';
import {useCurrentLocation} from '@entities/challenge/hooks';
import VerifyMap from '@entities/challenge/ui/VerifyMap';
import {VerifyMapBottomSheet} from '@features/verification/ui';
import GymListBottomSheet from '@features/verification/ui/GymListBottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';
import {RouteProp, useRoute} from '@react-navigation/native';
import {ChallengeRoute} from '@shared/constants';
import {useRef, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const VerifyLocation = () => {
  const route = useRoute<RouteProp<ChallengeRoute, 'verify_location'>>();

  const {currentLocation} = useCurrentLocation();

  const {challengeId, challengeTitle} = route.params;

  const [selectedGym, setSelectedGym] = useState<ChallengeGym | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const {data: gyms} = useGetChallengeGyms(challengeId, currentLocation);

  const showTab = (gym: ChallengeGym) => {
    setSelectedGym(gym);
    bottomSheetRef.current?.expand();
  };

  const closeTab = () => {
    setSelectedGym(null);
    bottomSheetRef.current?.collapse();
  };

  return (
    <GestureHandlerRootView className="flex-1">
      <VerifyMap
        gyms={gyms}
        challengeId={challengeId}
        selectedGym={selectedGym}
        setSelectedGym={setSelectedGym}
        showTab={showTab}
        closeTab={closeTab}
        currentLocation={currentLocation}
      />
      {/* 바텀 시트 */}
      <BottomSheet
        ref={bottomSheetRef}
        handleStyle={{
          paddingVertical: 20,
        }}
        handleIndicatorStyle={{
          width: 60,
          height: 4,
          borderRadius: 4,
          backgroundColor: '#4E4E4E',
        }}
        snapPoints={[40, 480]}
        backgroundStyle={{backgroundColor: '#151518'}}
        onClose={() => setSelectedGym(null)}
        enableDynamicSizing={false}>
        {currentLocation && selectedGym ? (
          // 선택 된 암장이 있는 경우 선택 된 암장의 정보
          <VerifyMapBottomSheet
            ref={bottomSheetRef}
            challengeId={challengeId}
            challengeTitle={challengeTitle}
            selectedGym={selectedGym}
            setSelectedGym={setSelectedGym}
            currentLocation={currentLocation}
          />
        ) : (
          // 선택 된 암장이 없는 경우 암장 목록
          <GymListBottomSheet gyms={gyms} setSelectedGym={setSelectedGym} />
        )}
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default VerifyLocation;
