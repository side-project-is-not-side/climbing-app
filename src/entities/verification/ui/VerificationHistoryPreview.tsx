'use client';
import React from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {SquareImage} from '../../../shared/ui';
import {ChallengeRoute, colors} from '../../../shared/constants';

import { Activity } from '../type';

const {width} = Dimensions.get('screen')

const VerificationHistoryPreview = ({recentActivities} : {recentActivities: Activity[]}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const handlePressMoreHistory = (enabled: boolean) => {
    enabled && navigation.navigate('verification_history');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>인증 기록</Text>
      <View style={styles.recentHistories}>
        {recentActivities.map((activity, i) => (
            <View key={activity.imageUrl} style={styles.imageContainer}>
              <Pressable onPress={() => handlePressMoreHistory(i === 2)}>
                <SquareImage
                  // source={{uri: activity.imageUrl}}
                  source={require('../../../../assets/images/fire_full.png')}
                  alt={'verification photo'}
                  style={styles.image}
                />
                {i === 2 && (
                  <View style={styles.more}>
                    <Text style={styles.moreInnerText}>더보기</Text>
                  </View>
                )}
              </Pressable>
            </View>
          ))}
      </View>
    </View>
  );
};

export default VerificationHistoryPreview;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  title: {
    marginBottom: 10,
    color: colors.black,
    fontSize: 14,
    fontWeight: '700',
  },
  recentHistories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 8,
  },
  imageContainer: {
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 10,
    maxWidth: (width - 48)/3
  },
  image: {
    width: '100%',
    backgroundColor: colors.beige300,
    resizeMode: 'contain',
  },
  more: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#0007',
  },
  moreInnerText: {
    color: colors.white,
  },
});
