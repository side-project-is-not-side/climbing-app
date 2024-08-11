import React, { useEffect, useRef, useState } from 'react';
import {MapBottomSheet, NearbyMap} from '../entities/map/ui';
import {View} from 'react-native';
import { NearestGyms } from '@entities/gym/ui';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import CurrentGymCard from '@entities/map/ui/CurrentGymCard';

const MapScreen = () => {
  const [selected, setSelected] = useState<number>();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(()=>{
    if(!!selected) {
      if(!bottomSheetRef.current) return;
      bottomSheetRef.current.snapToIndex(1)
    }
  },[selected]);

  const onPress = () => {
    setSelected(undefined)
    if(!bottomSheetRef.current) return;
    bottomSheetRef.current.snapToIndex(0)
  }

  return (
    <View style={{flex: 1}}>
      <NearbyMap selected={selected} setSelected={setSelected} />
      <MapBottomSheet ref={bottomSheetRef} onPress={onPress}>
        {!selected && <NearestGyms setSelected={setSelected} />}
        {!!selected && <CurrentGymCard id={selected} />}
      </MapBottomSheet>
    </View>
  );
};

export default MapScreen;
