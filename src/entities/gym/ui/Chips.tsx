import React from 'react';
import {FlatList, Text, View} from 'react-native';

const renderItem = ({item}: {item: string}) => {
  return (
    <View className="flex px-[10px] h-5 justify-center items-center rounded-[10px] bg-grayscale-600">
      <Text className="text-grayscale-400 font-flag">{item}</Text>
    </View>
  );
};

const Chips = ({chips}: {chips: string[]}) => {
  return (
    <FlatList
      data={chips}
      horizontal
      contentContainerStyle={{
        alignSelf: 'stretch',
        gap: 4,
      }}
      keyExtractor={(item, index) => item + index}
      renderItem={renderItem}
    />
  );
};

export default Chips;
