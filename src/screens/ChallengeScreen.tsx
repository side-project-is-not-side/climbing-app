import React from 'react';
// import {WEB_URL, WebViewScreen} from '../../shared';
import {Challenges} from '../widgets';
import {StyleSheet, Text, View} from 'react-native';

const ChallengeScreen = () => {
  // return <WebViewScreen uri={WEB_URL.CHALLENGE} />;
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          클라이밍 챌린지를 수행하고 {'\n'}
          뱃지를 획득해봐요!
        </Text>
      </View>
      <Challenges />
    </View>
  );
};

export default ChallengeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    paddingVertical: 22,
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
});
