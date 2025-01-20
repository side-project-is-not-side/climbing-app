import {useGuestLogin} from '../hooks/useGuestLogin';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import {Button, Icon} from '@shared/ui';
import React, {ForwardedRef, forwardRef} from 'react';
import {Image, Pressable, Text, View} from 'react-native';

const List = ({text}: {text: string}) => {
  return (
    <View className="flex-row justify-start my-3">
      <View className="bg-white rounded-full w-0.5 h-0.5 my-[10px] mr-2"></View>
      <View>
        <Text className="text-white">{text}</Text>
      </View>
    </View>
  );
};

const GuestGuideTab = forwardRef(
  ({hideTab, isShowTab}: {hideTab: () => void; isShowTab: boolean}, ref: ForwardedRef<BottomSheet>) => {
    const {trigger: login} = useGuestLogin();

    return (
      <BottomSheet
        ref={ref}
        // handleStyle={{
        //   paddingVertical: 20,
        // }}
        handleStyle={{padding: 0}}
        handleIndicatorStyle={{
          width: 0,
          height: 0,
          // width: 60,
          // height: 4,
          borderRadius: 4,
          backgroundColor: '#4E4E4E',
        }}
        snapPoints={[1, 560]}
        backgroundStyle={{backgroundColor: '#191B1D'}}
        enableContentPanningGesture={false}
        enablePanDownToClose
        backdropComponent={() => (
          <>
            {isShowTab && (
              <Pressable
                onPress={hideTab}
                className="absolute top-0 right-0 w-full h-screen bg-neutral-800 opacity-50"></Pressable>
            )}
          </>
        )}>
        <BottomSheetView style={{padding: 20, paddingBottom: 20, flex: 1, borderWidth: 1, borderColor: 'transparent'}}>
          <View className="px-5 my-5 relative">
            <Text className="text-center text-white font-bold mb-5">일일 계정 유의사항</Text>
            <Pressable onPress={hideTab} className="absolute top-1/2 right-2 -translate-y-[18px]">
              <Icon name="Close" size={18} />
            </Pressable>
          </View>
          <View className="bg-[#101212] px-5 py-4 mb-4 rounded-[20px]">
            <List text={'일일 계정은 소셜 로그인을 하지 않고 저희 앱을 체험할 수 있는 계정입니다.'} />
            <List text={'일일 계정으로 활동한 데이터는 하루동안 보관합니다. (인증 사진과 그 외 체험 활동 등등)'} />
            <List text={'일일 계정의 데이터는 삭제될 수 있습니다.'} />
            <List text={'일일 계정은 아래의 특정 챌린지만 이용 가능합니다.'} />
            <Image
              source={require('../../../../assets/images/challenge_card.png')}
              alt={'guide image'}
              className="mx-auto rounded-xl w-full h-[120px]"
            />
          </View>
          <Button onPress={() => login()}>시작하기</Button>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default GuestGuideTab;
