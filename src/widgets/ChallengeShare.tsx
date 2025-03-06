import {ShareCard} from '@entities/challenge/ui';
import {Button} from '@shared/ui';
import React, {useEffect, useRef, useState} from 'react';
import {Platform, View} from 'react-native';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';

const ChallengeShare = () => {
  const ref = useRef<ViewShot>(null);
  const [captureImage, setCaputreImage] = useState<string>();

  const captureScreen = () => {
    if (ref.current) {
      ref.current
        .capture?.()
        .then(uri => {
          setCaputreImage(uri);
          console.log('캡처 성공:', uri);
        })
        .catch(error => {
          console.error('캡처 실패:', error);
        });
    }
  };

  const shareImage = () => {
    if (!captureImage) return console.log('no image');
    Share.open({
      url: Platform.OS === 'ios' ? `file://${captureImage}` : captureImage,
    });
  };

  useEffect(() => {
    captureScreen();
  }, []);
  return (
    <View className="flex-1 justify-center px-8">
      <ViewShot
        ref={ref}
        options={{
          format: 'png',
        }}>
        <ShareCard />
      </ViewShot>
      <Button onPress={() => shareImage()}>공유하기</Button>
    </View>
  );
};

export default ChallengeShare;
