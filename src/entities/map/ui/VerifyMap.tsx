import { View } from 'react-native';
import { NaverMapView } from '@mj-studio/react-native-naver-map';

import Marker from './Marker'

import { useCurrentLocation } from '../hooks';

type Props = {
  showTab: () => void
}

const VerifyMap = ({showTab}: Props) => {
  const {currentLocation} = useCurrentLocation(15)

  const onTabMarker = () => {
    showTab()
  }

  return (
    <View style={{flex: 1}}>
      <NaverMapView
        mapType="Basic"
        style={{flex: 1}}
        camera={{...currentLocation, zoom: 16}}
        >
        {/* 내 위치 */}
        <Marker
          latitude={currentLocation.latitude}
          longitude={currentLocation.longitude}
          type={'circle'}
        />

        {/* 주변 암장 - 인증 가능 */}
        <Marker
          latitude={currentLocation.latitude + 0.001}
          longitude={currentLocation.longitude - 0.001}
          type={'active'}
          onTap={onTabMarker}
        />

        {/* 주변 암장 - 인증 불가 */}
        <Marker
          latitude={currentLocation.latitude - 0.001}
          longitude={currentLocation.longitude + 0.001}
          type={'disabled'}
          onTap={onTabMarker}
        />
      </NaverMapView>
    </View>
  );
};

export default VerifyMap;
