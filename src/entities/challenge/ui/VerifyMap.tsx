import Marker from '../../map/ui/Marker';
import {ChallengeGym} from '../type';
import {Location} from '@entities/gym/api/types';
import {NaverMapView, NaverMapViewRef} from '@mj-studio/react-native-naver-map';
import {colors} from '@shared/constants';
import {useEffect, useRef} from 'react';
import {View} from 'react-native';

type Props = {
  gyms: ChallengeGym[] | undefined;
  challengeId: number;
  currentLocation: Location | undefined;
  selectedGym: ChallengeGym | null;
  setSelectedGym: React.Dispatch<React.SetStateAction<ChallengeGym | null>>;
  showTab: (id: ChallengeGym) => void;
  closeTab: () => void;
};

const VerifyMap = ({gyms, challengeId, currentLocation, selectedGym, setSelectedGym, showTab, closeTab}: Props) => {
  const ref = useRef<NaverMapViewRef>(null);

  const onTabMap = () => {
    setSelectedGym(null);
    closeTab();
  };

  const onTabMarker = (id: ChallengeGym) => {
    showTab(id);
  };

  useEffect(() => {
    ref.current?.setLocationTrackingMode('NoFollow');
  }, []);

  useEffect(() => {
    if (currentLocation) {
      ref.current?.animateCameraTo({...currentLocation, zoom: 15});
    }
  }, [currentLocation]);

  useEffect(() => {
    selectedGym &&
      ref.current?.animateCameraTo({
        latitude: selectedGym.latitude - 0.0035,
        longitude: selectedGym.longitude,
        zoom: 15,
      });
  }, [selectedGym]);

  return (
    <View style={{flex: 1}}>
      <NaverMapView ref={ref} mapType="Basic" style={{flex: 1}} onTapMap={onTabMap}>
        {gyms &&
          gyms.map(gym => {
            const canVerify = gym.canChallenge;
            return (
              <Marker
                key={gym.id}
                latitude={gym.latitude}
                longitude={gym.longitude}
                type={canVerify ? (selectedGym?.id === gym.id ? 'active' : 'inactive') : 'disabled'}
                onTap={() => (canVerify ? onTabMarker(gym) : console.log(gym))}
                caption={{text: gym.name, color: canVerify ? 'black' : colors.gray700}}
              />
            );
          })}
      </NaverMapView>
    </View>
  );
};

export default VerifyMap;
