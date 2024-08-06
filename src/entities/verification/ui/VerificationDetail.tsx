import React, {useLayoutEffect} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {SquareImage, MenuButton} from '../../../shared/ui';
import {ChallengeRoute, colors} from '../../../shared/constants';
import { formatKST } from './../../../shared/utils/dateFormat';

const deviceWidth = Dimensions.get('window').width;

const VerificationDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  const route = useRoute<RouteProp<ChallengeRoute, 'verification_detail'>>();
  const {imageUrl,createdAt} = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuButton
          actions={[{title: '삭제하기'}, {title: '인증 내보내기'}]}
          onPress={e => {
            console.log(e.nativeEvent);
          }}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.imageContainer}>
        <SquareImage
          source={{uri: imageUrl}}
          alt={'verification photo'}
          style={[styles.image]}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 20,
        }}>
        <Text>인증 날짜</Text>
        <Text>{formatKST(new Date(createdAt))}</Text>
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
