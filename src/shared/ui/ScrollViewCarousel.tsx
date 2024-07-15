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
      <View style={styles.carouselContainer}>
        <ScrollView
          style={{flex: 1}}
          horizontal
          pagingEnabled
          decelerationRate="fast"
          scrollEventThrottle={200}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{width: `${100 * data.length}%`}}
          onContentSizeChange={w => setItemWidth(w / data.length)}
          onScroll={onScroll}>
          <View style={styles.row}>
            {data.map((item, index) => {
              return (
                <View
                  key={keyExtractor(item)}
                  style={[styles.carouselItemContainer, {width: itemWidth}]}>
                  {/* <View style={styles.carouselItem} /> */}
                  {render(item, index)}
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.indicatorWrapper}>
        {Array.from({length: data.length}, (_, i) => i).map(i => (
          <View
            key={`indicator_${i}`}
            style={[
              styles.indicator,
              {backgroundColor: i === page ? '#262626' : '#dfdfdf'},
            ]}
          />
        ))}
      </View>
    </>
  );
};

export default ScrollViewCarousel;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  carouselItemContainer: {
    height: '100%',
  },
  carouselItem: {
    flex: 1,
  },
  indicatorWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 8,
  },
  indicator: {
    marginVertical: 4,
    width: 6,
    height: 6,
    borderRadius: 100,
  },
});
