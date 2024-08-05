import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React from 'react';
import {NearestGyms} from '../../gym/ui';

const NearbyBottomSheet = () => {
  return (
    <BottomSheet
      handleStyle={{
        paddingVertical: 20,
      }}
      handleIndicatorStyle={{
        width: 60,
        height: 4,
        borderRadius: 4,
        backgroundColor: '#4E4E4E',
      }}
      snapPoints={['6%', '50%']}
      backgroundStyle={{backgroundColor: '#151518'}}>
      <BottomSheetView style={{paddingHorizontal: 20, flex: 1}}>
        <NearestGyms />
      </BottomSheetView>
    </BottomSheet>
  );
};

export default NearbyBottomSheet;
