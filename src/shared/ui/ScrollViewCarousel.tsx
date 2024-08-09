'use client';
import React, {Key, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

type Props<T> = {
  data: T[];
  render: (data: T, index: number) => React.ReactNode;
  keyExtractor: (data: T) => Key | null | undefined;
};

const ScrollViewCarousel = <T extends any>({
  data,
  render,
  keyExtractor,
}: Props<T>) => {
  const [page, setPage] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  const onScroll = (e: any) => {
    const newPage = Math.round(e.nativeEvent.contentOffset.x / itemWidth);
    setPage(newPage);
  };

  return (
    <>
      <View className='flex-1'>
        <ScrollView
          className='flex-1'
          horizontal
          pagingEnabled
          decelerationRate="fast"
          scrollEventThrottle={200}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{width: `${100 * data.length}%`}}
          onContentSizeChange={w => setItemWidth(w / data.length)}
          onScroll={onScroll}>
            {data.map((item, index) => {
              return (
                <View
                  key={keyExtractor(item)}
                  style={{width: itemWidth}}
                  >
                  {render(item, index)}
                </View>
              );
            })}
        </ScrollView>
      </View>
      <View className='flex-row justify-center gap-[6px] mt-2'>
        {Array.from({length: data.length}, (_, i) => i).map(i => (
          <View
            key={`indicator_${i}`}
            className={`my-1 w-[6px] h-[6px] rounded-full ${i === page ? "bg-white" : 'bg-neutral-600'}`}
          />
        ))}
      </View>
    </>
  );
};

export default ScrollViewCarousel;
