import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import React, {PropsWithChildren, useCallback} from 'react';
import {StyleSheet} from 'react-native';

const MapBottomSheet = React.forwardRef<
  BottomSheet,
  PropsWithChildren<Pick<BottomSheetDefaultBackdropProps, 'onPress'> & Pick<BottomSheetProps, 'onChange'>>
>(({children, onPress, onChange}, ref) => {
  const snapPoints = React.useMemo(() => ['6%', '60%', '100%'], []);
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={1}
        disappearsOnIndex={0}
        opacity={0.4}
        onPress={onPress}
        pressBehavior="collapse"
      />
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
      // enableDynamicSizing
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
    paddingBottom: 0,
    flex: 1,
    minHeight: 500,
  },
});

export default MapBottomSheet;
