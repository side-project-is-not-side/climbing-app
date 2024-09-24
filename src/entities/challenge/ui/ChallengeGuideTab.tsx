import {ActivityType} from '../type';
import VerifyLocationGuide from '@entities/challenge/ui/VerifyLocationGuide';
import VerifyPhotoGuide from '@entities/challenge/ui/VerifyPhotoGuide';
import {GetGymDetailResponse} from '@entities/gym/api/types';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {CHALLENGE_ROUTES, ChallengeRoute} from '@shared/constants';
import {Button} from '@shared/ui';
import React, {ForwardedRef, forwardRef} from 'react';
import {Pressable} from 'react-native';

type Props = {
  activityType: ActivityType;
  challengeTitle: string;
  challengeId: number;
};

const ChallengeGuideTab = forwardRef(
  ({activityType, challengeTitle, challengeId}: Props, ref: ForwardedRef<BottomSheet>) => {
    const navigation = useNavigation<NativeStackNavigationProp<ChallengeRoute>>();

    const handleVerify = () => {
      if (!challengeId) return;
      switch (activityType) {
        case 'PICTURE':
          return navigation.replace(CHALLENGE_ROUTES.VERIFY_PHOTO, {
            challengeTitle,
            challengeId,
          });
        case 'LOCATION':
          return navigation.navigate(CHALLENGE_ROUTES.VERIFY_LOCATION, {
            challengeTitle,
            challengeId,
          });
      }
    };

    return (
      <BottomSheet
        ref={ref}
        handleStyle={{
          paddingVertical: 20,
        }}
        handleIndicatorStyle={{
          width: 60,
          height: 4,
          borderRadius: 4,
          backgroundColor: '#4E4E4E',
        }}
        snapPoints={[1, '80%']}
        backgroundStyle={{backgroundColor: '#151518'}}
        onClose={() => {}}
        enableContentPanningGesture={false}
        enablePanDownToClose>
        <BottomSheetView style={{padding: 20, flex: 1}}>
          {activityType === 'LOCATION' && <VerifyLocationGuide />}
          {activityType === 'PICTURE' && <VerifyPhotoGuide />}
          <Button onPress={handleVerify}>인증하기</Button>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default ChallengeGuideTab;
