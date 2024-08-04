import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import React from 'react';
import {Text, View} from 'react-native';

const NearbyBottomSheet = () => {
  return (
    <View>
      <BottomSheet>
        <BottomSheetView>
          <Text>hi</Text>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default NearbyBottomSheet;
