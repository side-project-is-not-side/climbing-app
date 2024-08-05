import React from 'react';
import {FlatList, Text, View} from 'react-native';

const renderItem = ({item}: {item: string}) => {
  return (
    <View className="flex px-[10px] py-0.5 justify-center items-center rounded-[10px] bg-gray-600">
      <Text className="text-gray-400 text-xs font-medium">{item}</Text>
    </View>
  );
};

const Chips = ({chips}: {chips: string[]}) => {
  return (
    <FlatList
      data={chips}
      keyExtractor={(item, index) => item + index}
      renderItem={renderItem}
    />
  );
};

export default Chips;
