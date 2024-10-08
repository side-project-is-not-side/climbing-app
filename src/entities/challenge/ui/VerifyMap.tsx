import {useCurrentLocation} from '../../map/hooks';
import Marker from '../../map/ui/Marker';
import {useGetChallengeGyms} from '../queries/useGetChallengeGyms';
import {NaverMapView} from '@mj-studio/react-native-naver-map';
import {colors} from '@shared/constants';
import {View} from 'react-native';

type Props = {
  challengeId: number;
  selectedMarkerIdx: number | null;
  setSelectedMarkerIdx: React.Dispatch<React.SetStateAction<number | null>>;
  showTab: (id: number) => void;
  closeTab: () => void;
};

const VerifyMap = ({challengeId, selectedMarkerIdx, setSelectedMarkerIdx, showTab, closeTab}: Props) => {
  const {currentLocation} = useCurrentLocation(15);

  const {data} = useGetChallengeGyms(challengeId);

  const onTabMap = () => {
    setSelectedMarkerIdx(null);
    closeTab();
  };

  const onTabMarker = (id: number) => {
    setSelectedMarkerIdx(id);
    showTab(id);
  };

  return (
    <View style={{flex: 1}}>
      <NaverMapView mapType="Basic" style={{flex: 1}} camera={{...currentLocation, zoom: 16}} onTapMap={onTabMap}>
        {/* 내 위치 */}
        <Marker latitude={currentLocation.latitude} longitude={currentLocation.longitude} type={'circle'} />

        {data &&
          data.map(gym => {
            const canVerify = gym.canChanllenge;
            return (
              <Marker
                key={gym.id}
                latitude={gym.latitude}
                longitude={gym.longitude}
                type={canVerify ? (selectedMarkerIdx === gym.id ? 'active' : 'inactive') : 'disabled'}
                onTap={() => canVerify && onTabMarker(gym.id)}
                caption={{text: gym.name, color: canVerify ? 'black' : colors.gray700}}
              />
            );
          })}
      </NaverMapView>
    </View>
  );
};

export default VerifyMap;
