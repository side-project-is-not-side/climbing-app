import BottomSheet, {BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView} from '@gorhom/bottom-sheet';
import React, {PropsWithChildren, useCallback} from 'react';
import {StyleSheet} from 'react-native';

const MapBottomSheet = React.forwardRef<
  BottomSheet,
  PropsWithChildren<{onPress: () => void; onChange: (index: number) => void}>
>(({children, onPress, onChange}, ref) => {
  const snapPoints = React.useMemo(() => ['6%', '50%', '100%'], []);
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={1} disappearsOnIndex={0} opacity={0.4} onPress={onPress} />
    ),
    [],
  );
  return (
    <BottomSheet
      ref={ref}
      handleStyle={styles.handle}
      handleIndicatorStyle={styles.indicator}
      snapPoints={snapPoints}
      index={0}
      enableDynamicSizing
      backdropComponent={renderBackdrop}
      animateOnMount={false}
      onChange={onChange}
      backgroundStyle={{backgroundColor: '#151518'}}>
      <BottomSheetView style={styles.bottomSheetView}>{children}</BottomSheetView>
    </BottomSheet>
  );
});

const styles = StyleSheet.create({
  handle: {
    paddingVertical: 20,
  },
  indicator: {
    width: 60,
    height: 4,
    borderRadius: 4,
    backgroundColor: '#4E4E4E',
  },
  bottomSheetView: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    flex: 1,
    minHeight: 500,
  },
});

export default MapBottomSheet;
