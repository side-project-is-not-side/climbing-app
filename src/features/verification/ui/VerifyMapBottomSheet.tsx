import {useGetGymDetail} from '../queries/useGetGymDetail';
import {usePostVerifyLocation} from '../queries/usePostVerifyLocation';
import {Location} from '@entities/gym/api/types';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {colors} from '@shared/constants';
import {Button} from '@shared/ui';
import React, {ForwardedRef, forwardRef} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

type Props = {
  challengeId: number;
  challengeTitle: string;
  selectedGymId: number;
  currentLocation: Location;
  onClose: () => void;
};

const VerifyMapBottomSheet = forwardRef(
  ({challengeId, challengeTitle, selectedGymId, currentLocation, onClose}: Props, ref: ForwardedRef<BottomSheet>) => {
    const {data: gym} = useGetGymDetail(selectedGymId, currentLocation);

    const {trigger, isMutating} = usePostVerifyLocation(challengeId, challengeTitle);

    const handleVerify = () => {
      if (!gym) return;
      trigger({latitude: gym.location.latitude, longitude: gym.location.longitude, gymId: gym.id});
    };

    return (
      <BottomSheet
        ref={ref}
        handleStyle={{
          paddingVertical: 20,
        }}
        handleIndicatorStyle={{
          width: 60,
          height: 4,
          borderRadius: 4,
          backgroundColor: '#4E4E4E',
        }}
        snapPoints={[480]}
        backgroundStyle={{backgroundColor: '#151518'}}
        onClose={() => onClose()}
        enablePanDownToClose>
        <BottomSheetView style={{padding: 20, flex: 1}}>
          {gym?.thumbnailImageUrl && (
            <Image src={gym?.thumbnailImageUrl} alt={'verification guide image'} style={styles.image} />
          )}
          <View style={{gap: 8, paddingTop: 20, paddingBottom: 40}}>
            <Text style={styles.name}>{gym?.name}</Text>
            <View style={styles.description}>
              <Text style={styles.distance}>{gym?.distance}m</Text>
              <Text style={styles.address}>|</Text>
              <Text style={styles.address}>{gym?.roadNameAddress}</Text>
            </View>
            <View style={styles.tags}>
              {gym?.tags &&
                gym.tags.map((tag, index) => (
                  <View style={styles.tag} key={tag + '_' + index}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
            </View>
          </View>
          <Button onPress={handleVerify} disabled={!gym || isMutating}>
            이 위치로 인증하기
          </Button>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default VerifyMapBottomSheet;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: (deviceWidth - 40) * 0.445,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  name: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    flexDirection: 'row',
    gap: 4,
  },
  distance: {
    color: colors.white,
  },
  address: {
    color: colors.gray200,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginVertical: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: colors.gray400,
    borderRadius: 4,
  },
  tagText: {
    color: colors.gray200,
  },
});
