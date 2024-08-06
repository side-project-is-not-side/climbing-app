'use client';
import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {Challenge} from '../type';
import {useNavigation} from '@react-navigation/native';
import {
  CHALLENGE_ROUTES,
  ChallengeRoute,
  colors,
} from '../../../shared/constants';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Badge} from '../../../shared/ui';

const activityTypes = {
  PICTURE: '사진 챌린지',
  VIDEO: '레벨도전',
  LOCATION: '암장도전',
};

const Card = ({challenge}: {challenge: Challenge}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const handlePressCard = () => {
    navigation.navigate(CHALLENGE_ROUTES.CHALLENGE_DETAIL, {
      challengeId: challenge.id,
    });
  };

  return (
    <Pressable style={styles.cardContainer} onPress={handlePressCard}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../assets/images/fire_full.png')}
          alt="progress fire image"
          width={75}
          height={60}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.type}>{activityTypes[challenge.activityType]}</Text>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {challenge.title}
        </Text>
        <Text numberOfLines={2} ellipsizeMode="tail">
          {challenge.summary}
        </Text>
        <View style={styles.alignRight}>
          <Badge
            text={`${challenge.activityCount}/${challenge.successCount}`}
            style={{badge: {marginTop: 8}}}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    gap: 16,
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingLeft: 20,
    paddingRight: 16,
    marginVertical: 5,
    borderRadius: 20,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  type: {
    marginBottom: 4,
    color: colors.primary400,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.black,
  },
  summary: {
    color: colors.gray400,
  },
  alignRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
