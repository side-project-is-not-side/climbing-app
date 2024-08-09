import React, { ForwardedRef, forwardRef } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import { CHALLENGE_ROUTES, ChallengeRoute, colors } from '@shared/constants';
import { Button } from '@shared/ui';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const deviceWidth = Dimensions.get('window').width;

type Props = {
}

const VerifyMapBottomSheet = forwardRef(({}: Props, ref: ForwardedRef<BottomSheet>) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  const route = useRoute<RouteProp<ChallengeRoute, 'verify_location'>>();

  const handleVerify = () => {
    navigation.navigate(CHALLENGE_ROUTES.VERIFY_COMPLETE, {
      image: {uri: 'https://picsum.photos/id/237/200/300'},
      challengeId: route.params.challengeId,
    });
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
      snapPoints={[1, 450]}
      backgroundStyle={{backgroundColor: '#151518'}}
      enablePanDownToClose
      >
      <BottomSheetView style={{padding: 20, flex: 1}}>
          <Image source={require('../../../../assets/images/verification_guide_1.png')}
            alt={'verification guide image'} style={styles.image}></Image>
          <View style={{gap: 8, paddingTop: 20, paddingBottom: 40}}>
            <Text style={styles.name}>더클라임 클라이밍 짐앤샵 연남점</Text>
            <View  style={styles.description}>
              <Text style={styles.distance}>100m</Text>
              <Text style={styles.address}>|</Text>
              <Text style={styles.address}>서울특별시 강남구 연남동 어쩌구</Text>
            </View>
            <View style={styles.tags}>
              <View style={styles.tag}><Text style={styles.tagText}>휴식공간</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>주차창</Text></View>
              <View style={styles.tag}><Text style={styles.tagText}>넓은 암장</Text></View>
            </View>
          </View>
        <Button onPress={handleVerify}>이 위치로 인증하기</Button>
      </BottomSheetView>
    </BottomSheet>
  );
});

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
    fontWeight: '700'
  },
  description: {
    flexDirection: 'row',
    gap: 4
  },
  distance: {
    color: colors.white,
  },
  address: {
    color: colors.gray200,
  },
  tags: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 4
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: colors.gray400,
    borderRadius: 4
  },
  tagText: {
    color: colors.gray200,
  }
})
