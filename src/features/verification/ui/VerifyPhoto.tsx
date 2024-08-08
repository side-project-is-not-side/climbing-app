import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Dimensions, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {useImagePicker} from '../../../shared/hooks';
import {Button, SquareImage} from '../../../shared/ui';
import {
  CHALLENGE_ROUTES,
  ChallengeRoute,
  colors,
} from '../../../shared/constants';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {formatKST} from '../../../shared/utils';

const {width} = Dimensions.get('window')

const VerifyPhoto = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  const route = useRoute<RouteProp<ChallengeRoute, 'verify_photo'>>();

  const {openGallery, selectedImage} = useImagePicker();

  const handleVerify = () => {
    if (!selectedImage) return;

    navigation.navigate(CHALLENGE_ROUTES.VERIFY_COMPLETE, {
      image: selectedImage,
      challengeId: route.params.challengeId,
    });
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
    <View style={styles.root}>
      <View style={styles.imageContainer}>
        {selectedImage && (
          <>
            <Image source={selectedImage} style={styles.image} />
            <View style={styles.imageInfo}>
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
  root: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: width - 40,
    backgroundColor: colors.beige300,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 10,
  },
  imageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
});
