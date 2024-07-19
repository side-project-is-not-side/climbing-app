import React from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {
  CHALLENGE_ROUTES,
  ChallengeRoute,
  colors,
} from '../../../shared/constants';
import {SquareImage} from '../../../shared/ui';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const VerificationHistory = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={Array(22)
          .fill(0)
          .map((_, idx) => idx)}
        contentContainerStyle={{paddingVertical: 20}}
        numColumns={3}
        keyExtractor={item => item + ''}
        renderItem={() => (
          <Pressable
            style={styles.imageContainer}
            onPress={() =>
              navigation.navigate(CHALLENGE_ROUTES.VERIFICATION_DETAIL, {})
            }>
            <SquareImage
              source={require('../../../../assets/images/fire_full.png')}
              alt={'verification photo'}
              style={styles.image}
            />
          </Pressable>
        )}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </View>
  );
};

export default VerificationHistory;

const styles = StyleSheet.create({
  listContainer: {paddingHorizontal: 20},
  imageContainer: {
    flex: 1,
    margin: 4,
    maxWidth: '32%',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    backgroundColor: colors.beige300,
    resizeMode: 'contain',
  },
});
