import {MapBottomSheet, NearbyMap} from '../entities/map/ui';
import {GymList, NearestGyms, SelectedGymCard} from '@entities/gym/ui';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MAP_ROUTES, MapRoute} from '@shared/constants';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';

const MapScreen = () => {
  const [selected, setSelected] = useState<number>();
  const [showList, setShowList] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<NativeStackNavigationProp<MapRoute>>();
  const route = useRoute<RouteProp<MapRoute>>();

  useEffect(() => {
    if (!!selected) {
      if (!bottomSheetRef.current) return;
      bottomSheetRef.current.snapToPosition(1);
    }
  }, [selected]);

  useFocusEffect(() => {
    if (!!selected) {
      if (!bottomSheetRef.current) return;
      bottomSheetRef.current.snapToIndex(1);
    }
  });

  const onBackPress = () => {
    setSelected(undefined);
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.snapToIndex(0);
  };

  const onChange = (to: number) => {
    if (to === 2) {
      if (!!selected) {
        navigation.navigate(MAP_ROUTES.DETAIL, {id: selected});
        return;
      }

      setShowList(true);
      return;
    }

    setShowList(false);
  };

  const onItemClick = (id: number) => () => {
    setSelected(id);
  };

  return (
    <View style={{flex: 1}}>
      <NearbyMap selected={selected} setSelected={setSelected} />
      <MapBottomSheet ref={bottomSheetRef} onPress={onBackPress} onChange={onChange}>
        {!selected && !showList && <NearestGyms onClick={onItemClick} />}
        {!selected && showList && <GymList onClick={onItemClick} />}
        {!!selected && <SelectedGymCard id={selected} />}
      </MapBottomSheet>
    </View>
  );
};

export default MapScreen;
