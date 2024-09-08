import {ChallengeRoute, colors} from '../../../shared/constants';
import {MenuButton, SquareImage} from '../../../shared/ui';
import {formatKST} from './../../../shared/utils/dateFormat';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useLayoutEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

const VerificationDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  const route = useRoute<RouteProp<ChallengeRoute, 'verification_detail'>>();
  const {imageUrl, createdAt, challengeTitle} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuButton
          actions={[{title: '삭제하기'}, {title: '인증 내보내기'}]}
          onPress={e => {
            switch (e.nativeEvent.index) {
              case 0:
                return console.log('삭제');
              case 1:
                return console.log('내보내기');
            }
          }}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.imageContainer}>
        <SquareImage source={{uri: imageUrl}} alt={'verification photo'} style={[styles.image]} resizeMode="cover" />
      </View>
      <View className="my-5 bg-[#191B1D] p-5 rounded-md">
        <View className="flex-row items-center gap-4 mb-2">
          <Text className="text-grayscale-400">챌린지명</Text>
          <Text className="text-white">{challengeTitle}</Text>
        </View>
        <View className="flex-row items-center gap-4">
          <Text className="text-grayscale-400">인증날짜</Text>
          <Text className="text-white">{createdAt ? formatKST(new Date(createdAt)) : formatKST(new Date())}</Text>
        </View>
      </View>
    </View>
  );
};

export default VerificationDetail;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    margin: 4,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    backgroundColor: colors.beige300,
    resizeMode: 'contain',
    minHeight: deviceWidth - 40,
  },
});
