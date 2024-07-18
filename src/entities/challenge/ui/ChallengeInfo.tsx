import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ChallengeInfo = () => {
  return (
    <>
      <View style={styles.progressImageContainer}>
        <Image
          source={require('../../../../assets/images/fire_full.png')}
          alt="challenge progress image"
        />
      </View>
      <View style={styles.challengeInfoContainer}>
        <Text style={styles.type}>암장 도전</Text>
        <Text style={styles.title}>암장의 고인물</Text>
        <Text>
          같은 암장을 20번이나 갔더니 생긴 변화, {'\n'}이 암장의 고인물이
          되었다.!!!!!!
        </Text>
      </View>
    </>
  );
};

export default ChallengeInfo;

const styles = StyleSheet.create({
  progressImageContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
  },
  challengeInfoContainer: {
    marginVertical: 20,
  },
  type: {
    marginBottom: 4,
    color: 'red',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 34,
  },
});
