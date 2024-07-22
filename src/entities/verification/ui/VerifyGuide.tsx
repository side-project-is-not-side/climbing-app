import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from '../../../shared/constants';

const deviceWidth = Dimensions.get('window').width;

const VerifyGuide = () => {
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../assets/images/verification_guide_1.png')}
          alt={'verification guide image'}
          style={[styles.image]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.tag, styles.correct]}>인증 방법</Text>
        <Text style={styles.title}>도착점에 완등한 자신의 사진🔥</Text>
        <Text style={styles.description}>
          벽의 완등 지점에서 찍은 사진을 올려주세요.
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../assets/images/verification_guide_2.png')}
          alt={'verification guide image'}
          style={[styles.image]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.tag, styles.incorrect]}>인증 불가</Text>
        <Text style={styles.title}>벽과 자신이 드러나지 않은 사진🙅‍♂️</Text>
        <Text style={styles.description}>
          암장의 벽과 자신이 들어가지 않은 사진은 지양해주세요.
        </Text>
      </View>
    </ScrollView>
  );
};

export default VerifyGuide;

const styles = StyleSheet.create({
  imageContainer: {
    margin: 4,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: (deviceWidth - 40) * 0.43,
    backgroundColor: colors.beige100,
    resizeMode: 'cover',
  },
  textContainer: {
    gap: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 34,
  },
  tag: {
    fontSize: 14,
    fontWeight: '700',
  },
  correct: {
    color: '#00BA77',
  },
  incorrect: {
    color: '#FF4538',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.gray500,
  },
});
