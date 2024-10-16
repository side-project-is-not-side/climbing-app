import {CHALLENGE_ROUTES, ChallengeRoute, colors} from '../../../shared/constants';
import {SquareImage} from '../../../shared/ui';
import {useGetActivities} from '../api/useGetActivities';
import {VeirficationPhoto, VerificationInfo, VerificationLocation} from '../type';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Dimensions, Image, Text} from 'react-native';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const VerificationHistory = () => {
  const route = useRoute<RouteProp<ChallengeRoute, 'verification_history'>>();
  const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

  const {challengeId, challengeTitle, activityType} = route.params;

  const {data} = useGetActivities(challengeId, activityType);

  const handlePressHistory = (item: VerificationInfo) => {
    navigation.navigate(CHALLENGE_ROUTES.VERIFICATION_DETAIL, {
      challengeId,
      challengeTitle,
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
                <Text numberOfLines={2} ellipsizeMode="tail" className="text-xs text-center text-grayscale-400">
                  {gymName}
                </Text>
              </Pressable>
            );
          }
          return <></>;
        }}
      />
    </View>
  );
};

export default VerificationHistory;

const styles = StyleSheet.create({
  listContainer: {paddingHorizontal: 20},
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    margin: 4,
    maxWidth: (windowWidth - 64) / 3,
    height: (windowWidth - 64) / 3,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: colors.gray700,
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
  },
});
