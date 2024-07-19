import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Challenge} from '../type';
import {colors} from '../../../shared/constants';

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
        <Text style={styles.summary}>{challenge.summary}</Text>
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
    minHeight: 100,
    marginVertical: 20,
  },
  type: {
    marginBottom: 4,
    color: 'red',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: colors.black,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 34,
  },
  summary: {
    color: colors.gray400,
  },
});
