import {ChallengeRoute, colors} from '../../../shared/constants';
import {useImagePicker} from '../../../shared/hooks';
import {Button, MenuButton} from '../../../shared/ui';
import {formatKST} from '../../../shared/utils';
import {usePostVerifyPicture} from '../queries/usePostVerifyPicture';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useLayoutEffect} from 'react';
import {Alert, Dimensions, Image, StyleSheet, Text, View} from 'react-native';

const {width} = Dimensions.get('window');

const VerifyPhoto = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  const route = useRoute<RouteProp<ChallengeRoute, 'verify_photo'>>();
  const {challengeId, challengeTitle} = route.params;
  const {trigger, isMutating} = usePostVerifyPicture(challengeId, challengeTitle);

  const {openGallery, selectedImage} = useImagePicker();

  const handleVerify = () => {
    if (!selectedImage) return Alert.alert('선택 된 사진이 없습니다.');

    const formData = new FormData();
    formData.append('file', selectedImage);

    trigger(formData);
  };

  useEffect(() => {
    openGallery();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        selectedImage ? (
          <MenuButton
            actions={[{title: '사진 변경'}]}
            onPress={e => {
              switch (e.nativeEvent.index) {
                case 0:
                  return openGallery();
              }
            }}
          />
        ) : (
          <></>
        ),
    });
  }, [selectedImage]);

  return (
    <View className="flex-1 p-5">
      <View className="flex-1">
        {selectedImage && (
          <>
            <Image source={selectedImage} style={styles.image} />
            <View className="my-5 bg-[#191B1D] p-5 rounded-md">
              <View className="flex-row items-center gap-4 mb-2">
                <Text className="text-grayscale-400">챌린지명</Text>
                <Text className="text-white">{challengeTitle}</Text>
              </View>
              <View className="flex-row items-center gap-4">
                <Text className="text-grayscale-400">인증날짜</Text>
                <Text className="text-white">
                  {selectedImage.timestamp ? formatKST(new Date(selectedImage.timestamp)) : formatKST(new Date())}
                </Text>
              </View>
            </View>
          </>
        )}
      </View>

      {selectedImage ? (
        <Button onPress={handleVerify} disabled={isMutating}>
          인증하기
        </Button>
      ) : (
        <Button onPress={openGallery}>사진 선택하기</Button>
      )}
    </View>
  );
};

export default VerifyPhoto;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: width - 40,
    backgroundColor: colors.beige300,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 10,
  },
});
