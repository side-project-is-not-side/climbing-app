import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Challenge} from '../type';

const Card = ({challenge}: {challenge: Challenge}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../../assets/images/fire_full.png')}
          alt="progress fire image"
          width={75}
          height={60}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.type}>
          {challenge.type === 'climbing' ? '암장도전' : '레벨도전'}
        </Text>
        <Text style={styles.title}>{challenge.title}</Text>
        <Text style={styles.description}>{challenge.description}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {challenge.solved}/{challenge.total}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    gap: 26,
    backgroundColor: '#ccc',
    padding: 20,
    marginVertical: 5,
    borderRadius: 20,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  contentContainer: {},
  type: {
    marginBottom: 4,
    color: 'red',
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  description: {},
  badge: {
    marginTop: 8,
    padding: 4,
    width: 86,
    borderRadius: 200,
    backgroundColor: '#eee',
  },
  badgeText: {
    textAlign: 'center',
  },
});
