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
import { useGetActivities } from '../api/useGetActivities';

const VerificationHistory = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const {data} = useGetActivities()

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        contentContainerStyle={{paddingVertical: 20}}
        numColumns={3}
        keyExtractor={item => item.imageUrl}
        renderItem={({item}) => (
          <Pressable
            style={styles.imageContainer}
            onPress={() =>
              navigation.navigate(CHALLENGE_ROUTES.VERIFICATION_DETAIL, {imageUrl: item.imageUrl,
                createdAt: item.createdAt})
            }>
            <SquareImage
              source={{uri: item.imageUrl}}
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
