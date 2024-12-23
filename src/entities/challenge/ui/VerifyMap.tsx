import Marker from '../../map/ui/Marker';
import {useGetChallengeGyms} from '../queries/useGetChallengeGyms';
import {Location} from '@entities/gym/api/types';
import {NaverMapView, NaverMapViewRef} from '@mj-studio/react-native-naver-map';
import {colors} from '@shared/constants';
import {useEffect, useRef} from 'react';
import {View} from 'react-native';

type Props = {
  challengeId: number;
  selectedMarkerIdx: number | null;
  currentLocation: Location | undefined;
  setSelectedMarkerIdx: React.Dispatch<React.SetStateAction<number | null>>;
  showTab: (id: number) => void;
  closeTab: () => void;
};

const VerifyMap = ({
  challengeId,
  selectedMarkerIdx,
  currentLocation,
  setSelectedMarkerIdx,
  showTab,
  closeTab,
}: Props) => {
  const ref = useRef<NaverMapViewRef>(null);

  const {data} = useGetChallengeGyms(challengeId, currentLocation);
  const onTabMap = () => {
    setSelectedMarkerIdx(null);
    closeTab();
  };

  const onTabMarker = (id: number) => {
    setSelectedMarkerIdx(id);
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

  return (
    <View style={{flex: 1}}>
      <NaverMapView
        ref={ref}
        mapType="Basic"
        style={{flex: 1}}
        onTapMap={onTabMap}
        // isShowLocationButton={false}
      >
        {data &&
          data.map(gym => {
            const canVerify = gym.canChallenge;
            return (
              <Marker
                key={gym.id}
                latitude={gym.latitude}
                longitude={gym.longitude}
                type={canVerify ? (selectedMarkerIdx === gym.id ? 'active' : 'inactive') : 'disabled'}
                onTap={() => (canVerify ? onTabMarker(gym.id) : console.log(gym))}
                caption={{text: gym.name, color: canVerify ? 'black' : colors.gray700}}
              />
            );
          })}
      </NaverMapView>
    </View>
  );
};

export default VerifyMap;
