import {CHALLENGE_ROUTES, ChallengeRoute, colors} from '../../../shared/constants';
import {SquareImage} from '../../../shared/ui';
import {useGetActivities} from '../api/useGetActivities';
import {VeirficationPhoto, VerificationInfo, VerificationLocation} from '../type';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, Text} from 'react-native';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';

const VerificationHistory = () => {
  const route = useRoute<RouteProp<ChallengeRoute, 'verification_history'>>();
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const {challengeId, challengeTitle, activityType} = route.params;

  const {data} = useGetActivities(challengeId, activityType);

  const handlePressHistory = (item: VerificationInfo) => {
    navigation.navigate(CHALLENGE_ROUTES.VERIFICATION_DETAIL, {
      challengeTitle: challengeTitle,
      activityType,
      verificationInfo: item,
    });
  };

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={data}
        contentContainerStyle={{paddingVertical: 20}}
        numColumns={3}
        keyExtractor={(item, index) => `${item.id}_${index}`}
        renderItem={({item}) => {
          if (activityType === 'PICTURE') {
            const {imageUrl} = item as VeirficationPhoto;
            return (
              <Pressable style={styles.imageContainer} onPress={() => handlePressHistory(item)}>
                <SquareImage
                  source={{uri: imageUrl}}
                  alt={'verification photo'}
                  style={styles.image}
                  resizeMode="cover"
                />
              </Pressable>
            );
          }
          if (activityType === 'LOCATION') {
            const {gymName, gymAddress} = item as VerificationLocation;
            return (
              <Pressable style={styles.imageContainer} onPress={() => handlePressHistory(item)}>
                <Image source={require('../../../../assets/images/buri_pin.png')} alt={'verification location icon'} />
                <Text className="text-white">{gymName}</Text>
              </Pressable>
            );
          }
          return <></>;
        }}
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
    backgroundColor: colors.beige300,
  },
  image: {
    width: '100%',
    backgroundColor: colors.beige300,
    resizeMode: 'contain',
  },
});
