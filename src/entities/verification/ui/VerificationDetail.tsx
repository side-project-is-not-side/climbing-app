import {ChallengeRoute, colors} from '../../../shared/constants';
import {MenuButton, SquareImage} from '../../../shared/ui';
import {useDeleteActivity} from '../api/useDeleteActivity';
import {VerificationLocation} from '../type';
import {formatKST} from './../../../shared/utils/dateFormat';
import {ActivityPicture} from '@entities/challenge/type';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useLayoutEffect} from 'react';
import {Alert, Dimensions, StyleSheet, Text, View} from 'react-native';
import {mutate} from 'swr';

const deviceWidth = Dimensions.get('window').width;

const VerificationDetail = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  const route = useRoute<RouteProp<ChallengeRoute, 'verification_detail'>>();

  const {activityType, verificationInfo, challengeTitle, challengeId} = route.params;

  const {trigger} = useDeleteActivity(verificationInfo.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <MenuButton
          actions={[{title: '삭제하기'}, {title: '공유하기'}]}
          onPress={e => {
            switch (e.nativeEvent.index) {
              case 0:
                Alert.alert(
                  '정말로 인증 기록을 삭제하시겠습니까?',
                  '해당 사진을 삭제하면 진행한 인증도 삭제가 됩니다.',
                  [
                    {text: '취소하기', style: 'cancel'},
                    {
                      text: '삭제하기',
                      style: 'destructive',
                      onPress: () => {
                        trigger(null, {
                          onSuccess() {
                            mutate(`/v1/challenges/${challengeId}/${activityType}`);
                            mutate(`/v1/records/${activityType}?challengeId=${challengeId}`);
                            Alert.alert('삭제가 완료되었습니다.');
                            navigation.goBack();
                          },
                        });
                      },
                    },
                  ],
                );
                return;
              case 1:
                return console.log('공유하기');
            }
          }}
        />
      ),
    });
  }, []);

  return (
    <View style={styles.pageContainer}>
      {activityType === 'PICTURE' && (
        <View style={styles.imageContainer}>
          <SquareImage
            source={{uri: (verificationInfo as ActivityPicture).imageUrl}}
            alt={'verification photo'}
            style={[styles.image]}
            resizeMode="cover"
          />
        </View>
      )}
      <View className="my-5 bg-[#191B1D] p-5 rounded-md">
        <View className="flex-row items-center gap-4 mb-2">
          <Text className="text-grayscale-400">챌린지명</Text>
          <Text className="text-white">{challengeTitle}</Text>
        </View>
        <View className={`flex-row items-center gap-4 ${activityType === 'LOCATION' ? 'mb-2' : ''}`}>
          <Text className="text-grayscale-400">인증날짜</Text>
          <Text className="text-white">{formatKST(new Date(verificationInfo.createdAt))}</Text>
        </View>
        {activityType === 'LOCATION' && (
          <View className="flex-row items-center gap-4">
            <Text className="text-grayscale-400">인증위치</Text>
            <Text className="text-white">{(verificationInfo as VerificationLocation).gymName}</Text>
          </View>
        )}
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
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    backgroundColor: colors.beige300,
    minHeight: deviceWidth - 40,
  },
});
