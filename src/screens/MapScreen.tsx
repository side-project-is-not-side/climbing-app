import {MapBottomSheet, NearbyMap} from '../entities/map/ui';
import {GymList, NearestGyms, SelectedGymCard} from '@entities/gym/ui';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MAP_ROUTES, MapRoute} from '@shared/constants';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';

const MapScreen = () => {
  const [selected, setSelected] = useState<number>();
  const [showList, setShowList] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<NativeStackNavigationProp<MapRoute>>();

  useEffect(() => {
    if (selected && bottomSheetRef.current) {
      bottomSheetRef.current.snapToPosition(1);
    }
  }, [selected]);

  useFocusEffect(
    useCallback(() => {
      if (selected && bottomSheetRef.current) {
        bottomSheetRef.current.snapToIndex(1);
      }
    }, [selected]),
  );

  const onBackPress = useCallback(() => {
    setSelected(undefined);
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.snapToIndex(0);
  }, []);

  const onChange = useCallback(
    (to: number) => {
      if (to === 2) {
        if (selected) {
          navigation.navigate(MAP_ROUTES.DETAIL, {id: selected});
          return;
        }
        setShowList(true);
      } else {
        setShowList(false);
      }
    },
    [selected, navigation],
  );

  const onItemClick = useCallback(
    (id: number) => () => {
      setSelected(id);
    },
    [],
  );

  const renderContent = () => {
    if (!selected && !showList) {
      return <NearestGyms onClick={onItemClick} />;
    }
    if (!selected && showList) {
      return <GymList onClick={onItemClick} />;
    }

    return typeof selected === 'number' ? <SelectedGymCard id={selected} /> : null;
  };

  return (
    <View style={{flex: 1}}>
      <NearbyMap selected={selected} setSelected={setSelected} />

      <MapBottomSheet ref={bottomSheetRef} onPress={onBackPress} onChange={onChange}>
        {renderContent()}
      </MapBottomSheet>
    </View>
  );
};

export default MapScreen;
