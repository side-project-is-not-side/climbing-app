import { useState } from 'react';
import { View } from 'react-native';
import { NaverMapView } from '@mj-studio/react-native-naver-map';

import Marker from './Marker'

import { useCurrentLocation } from '../hooks';
import { colors } from '@shared/constants';

type Props = {
  showTab: () => void
  closeTab: () => void
}

const VerifyMap = ({showTab, closeTab}: Props) => {
  const {currentLocation} = useCurrentLocation(15)
  const [selectedMarkerIdx,setSelectedMarkerIdx] = useState<number|null>(null)

  const onTabMap = () => {
    setSelectedMarkerIdx(null)
    closeTab()
  }

  const onTabMarker = (id: number) => {
    setSelectedMarkerIdx(id)
    showTab()
  }


  const dummyLocations = [
    {
      id:1,
      canVerify: true,
      name: '더 클라임 클라이밍',
      latitude: currentLocation.latitude + 0.0004,
      longitude: currentLocation.longitude - 0.0008,
    },
    {
      id:2,
      canVerify: true,
      name: '클라임 클라이밍',
      latitude: currentLocation.latitude - 0.0005,
      longitude: currentLocation.longitude - 0.0005,
    },
    {
      id:3,
      canVerify: false,
      name: '암장암장',
      latitude: currentLocation.latitude + 0.001,
      longitude: currentLocation.longitude - 0.001,
    },
  ]

  return (
    <View style={{flex: 1}}>
      <NaverMapView
        mapType="Basic"
        style={{flex: 1}}
        camera={{...currentLocation, zoom: 16}}
        onTapMap={onTabMap}
        >
        {/* 내 위치 */}
        <Marker
          latitude={currentLocation.latitude}
          longitude={currentLocation.longitude}
          type={'circle'}
        />

        {dummyLocations.map(location => (
          <Marker
            key={location.id}
            latitude={location.latitude}
            longitude={location.longitude}
            type={location.canVerify ? selectedMarkerIdx===location.id ?  'active' : 'inactive': 'disabled'}
            onTap={() => location.canVerify && onTabMarker(location.id)}
            caption={{text: location.name, color: location.canVerify ? 'black' : colors.gray500}}
          />
        ))}
      </NaverMapView>
    </View>
  );
};

export default VerifyMap;
