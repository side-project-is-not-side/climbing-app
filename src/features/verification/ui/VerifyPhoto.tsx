import React, { useEffect, useLayoutEffect } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useImagePicker } from '../../../shared/hooks';
import { Button } from '../../../shared/ui';
import { 
  ChallengeRoute,
  colors,
} from '../../../shared/constants';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { formatKST } from '../../../shared/utils';
import { usePostVerifyPicture } from '../queries/usePostVerifyPicture';

const { width } = Dimensions.get('window')

const VerifyPhoto = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  const route = useRoute<RouteProp<ChallengeRoute, 'verify_photo'>>();
  const { trigger } = usePostVerifyPicture(route.params.challengeId)

  const {openGallery, selectedImage} = useImagePicker();

  const handleVerify = () => {
    if (!selectedImage) return;

    const formData = new FormData();
    formData.append('file', selectedImage);

    trigger(formData)
  };

  useEffect(() => {
    openGallery();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        selectedImage ? <Pressable onPress={openGallery}>
          <Text>수정하기</Text>
        </Pressable> : <></>
      ),
    });
  }, [selectedImage]);
  
  return (
    <View className='flex-1 p-5'>
      <View className='flex-1'>
        {selectedImage && (
          <>
            <Image source={selectedImage} style={styles.image} />
            <View className='flex-row items-center justify-between my-5'>
              <Text>인증날짜</Text>
              <Text>
                {selectedImage.timestamp &&
                  formatKST(new Date(selectedImage.timestamp))}
              </Text>
            </View>
          </>
        )}
      </View>

      {selectedImage ? (
        <Button onPress={handleVerify}>인증하기</Button>
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
