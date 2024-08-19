import {ZOOM_LEVEL} from '@entities/map/constants/location';
import {Marker} from '@entities/map/ui';
import {getLatLongDelta} from '@entities/map/utils';
import {NaverMapView} from '@mj-studio/react-native-naver-map';
import React from 'react';
import {View} from 'react-native';

const MAP_ID = 'map-place';

function LocationCard({latitude, longitude}: {latitude: number; longitude: number}) {
  const [latitudeDelta, longitudeDelta] = getLatLongDelta(ZOOM_LEVEL.거리, latitude);

  return (
    <View className="w-full h-[156px] overflow-hidden rounded-[10px]">
      <NaverMapView
        mapType="Basic"
        style={{flex: 1}}
        initialCamera={{latitude, longitude}}
        isShowLocationButton={false}>
        <Marker key={MAP_ID} latitude={latitude} longitude={longitude} type={'active'} />
      </NaverMapView>
    </View>
  );
}

export default LocationCard;
