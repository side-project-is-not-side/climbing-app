import {useCurrentLocation} from '../hooks';
import Marker from './Marker';
import {useGetGymsByLocation} from '@entities/gym/queries';
import {NaverMapView} from '@mj-studio/react-native-naver-map';
import {colors} from '@shared/constants';
import {useMemo, useState} from 'react';
import {View} from 'react-native';

type Props = {
  showTab: (id: number) => void;
  selectedMarkerIdx: number | null;
  setSelectedMarkerIdx: React.Dispatch<React.SetStateAction<number | null>>;
  closeTab: () => void;
};

type LatLng = {latitude: number; longitude: number};

const VerifyMap = ({showTab, selectedMarkerIdx, setSelectedMarkerIdx, closeTab}: Props) => {
  const {currentLocation} = useCurrentLocation(15);

  const {data} = useGetGymsByLocation();

  const gyms = useMemo(() => {
    const reduced = data ? data.reduce((acc, pageData) => [...acc, ...pageData], []) : [];
    return reduced;
  }, [data]);

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

        {gyms.map(gym => {
          const canVerify = true;
          // const canVerify = gym.distance < 100;
          return (
            <Marker
              key={gym.id}
              latitude={gym.location.latitude}
              longitude={gym.location.longitude}
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
