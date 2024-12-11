import {MapBottomSheet, NearbyMap} from '../entities/map/ui';
import {GymInfo} from '@entities/gym/api/types';
import {GymList, NearestGyms, SelectedGymCard} from '@entities/gym/ui';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet/BottomSheet';
import {RouteProp, useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MAP_ROUTES, MapRoute} from '@shared/constants';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View} from 'react-native';

const INITIAL_STATE = {
  id: undefined,
  location: undefined,
};

const MapScreen = () => {
  const [selected, setSelected] = useState<Partial<Pick<GymInfo, 'id' | 'location'>>>(INITIAL_STATE);
  const [showList, setShowList] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<NativeStackNavigationProp<MapRoute>>();

  useEffect(() => {
    if (selected.id && bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(1);
    }
  }, [selected.id]);

  useFocusEffect(
    useCallback(() => {
      if (selected.id && bottomSheetRef.current) {
        bottomSheetRef.current.snapToIndex(1);
      }
    }, [selected]),
  );

  const onBackPress = useCallback(() => {
    setSelected(INITIAL_STATE);
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.snapToIndex(0);
  }, []);

  const onChange = useCallback(
    (to: number) => {
      if (to === 2) {
        if (selected.id) {
          navigation.navigate(MAP_ROUTES.DETAIL, {id: selected.id});
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
    (id: number, location: GymInfo['location']) => () => {
      setSelected({id, location});
    },
    [],
  );

  const renderContent = () => {
    if (!selected.id && !showList) {
      return <NearestGyms onClick={onItemClick} />;
    }
    if (!selected.id && showList) {
      return <GymList onClick={onItemClick} />;
    }

    return typeof selected.id === 'number' ? <SelectedGymCard id={selected.id} /> : null;
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
