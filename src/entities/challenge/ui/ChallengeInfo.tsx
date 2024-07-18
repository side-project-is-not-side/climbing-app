import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Challenge} from '../type';

const activityTypes = {
  PICTURE: '사진 챌린지',
  VIDEO: '레벨도전',
  LOCATION: '암장도전',
};

const ChallengeInfo = ({challenge}: {challenge: Challenge}) => {
  return (
    <>
      <View style={styles.progressImageContainer}>
        <Image
          source={require('../../../../assets/images/fire_full.png')}
          alt="challenge progress image"
        />
      </View>
      <View style={styles.challengeInfoContainer}>
        <Text style={styles.type}>{activityTypes[challenge.activityType]}</Text>
        <Text style={styles.title}>{challenge.title}</Text>
        <Text>{challenge.summary}</Text>
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
