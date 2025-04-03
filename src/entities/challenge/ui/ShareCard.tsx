import {ActivityLocation, ActivityPicture, ChallengeShare} from '../type';
import {formatKST} from '@shared/utils';
import React, {useState} from 'react';
import {FlatList, Image, Text, View} from 'react-native';

interface Props {
  challenge: ChallengeShare;
  theme: 'DARK' | 'WHITE';
  setLoadedImages: React.Dispatch<React.SetStateAction<number>>;
}

const themeStyle = {
  DARK: {
    bg: 'bg-neutral-700',
    text: 'text-white',
  },
  WHITE: {
    bg: 'bg-white',
    text: 'text-neutral-black',
  },
};

const ShareCard = ({challenge, theme, setLoadedImages}: Props) => {
  const {title, userName, successImageUrl, challengeStartDate, challengeEndDate, records} = challenge;

  const [containerWidth, setContainerWidth] = useState(0);
  const imageWidth = containerWidth / 5 - 8;

  return (
    <View className={`${themeStyle[theme].bg} rounded-[20px] px-[20px] py-[30px] justify-center items-center`}>
      <View className="gap-[6px]">
        <Text className="text-center text-primary-400">Challenge completed!</Text>
        <Text className={`text-center ${themeStyle[theme].text} font-bold text-2xl`}>{title}</Text>
      </View>
      <View className="justify-center items-center gap-4 my-4">
        <Image src={successImageUrl} className="w-[182px] h-[182px] rounded-2xl" />
        <View className="py-4 gap-0.5">
          <Text className={`text-center ${themeStyle[theme].text} font-bold`}>{userName}</Text>
          <Text className={`text-center ${themeStyle[theme].text} opacity-50 text-sm`}>
            {formatKST(challengeStartDate)} - {formatKST(challengeEndDate)}
          </Text>
        </View>
      </View>

      <FlatList
        data={records.slice(0, 8) as ActivityPicture[]}
        keyExtractor={item => `${item.id}`}
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        style={{
          width: '100%',
        }}
        columnWrapperStyle={{
          justifyContent: 'center',
        }}
        numColumns={5}
        scrollEnabled={false}
        renderItem={({item}) => (
          <>
            {item.imageUrl ? (
              <Image
                key={item.id}
                src={item.imageUrl}
                style={{
                  width: imageWidth,
                  height: imageWidth,
                }}
                className={`m-1 rounded-sm`}
                onLoadEnd={() => setLoadedImages(prev => prev + 1)}
              />
            ) : (
              <View
                key={item.id}
                style={{
                  width: imageWidth,
                  height: imageWidth,
                }}
                className="bg-grayscale-600 p-1 m-1 rounded-sm justify-center items-center">
                <Image
                  source={require('/assets/images/buri_pin.png')}
                  onLoadEnd={() => setLoadedImages(prev => prev + 1)}
                />
              </View>
            )}
          </>
        )}
      />
    </View>
  );
};

export default ShareCard;
