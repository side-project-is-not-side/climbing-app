'use client';
import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const VerificationHistoryPreview = () => {
  let ref: React.ElementRef<typeof Image> | null = null;
  const imageRef: React.LegacyRef<Image> = (element: Image) => (ref = element);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref) {
      ref.measure((x, y, width) => {
        setHeight(width);
      });
    }
  }, [ref]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>인증 기록</Text>
      <View style={styles.recentHistories}>
        {Array(3)
          .fill(0)
          .map((v, i) => (
            <View key={i} style={styles.imageContainer}>
              <Image
                ref={imageRef}
                source={require('../../../../assets/images/fire_full.png')}
                alt={'verification photo'}
                style={[styles.image, {height}]}
              />
              {i === 2 && (
                <View style={styles.more}>
                  <Text style={styles.moreInnerText}>더보기</Text>
                </View>
              )}
            </View>
          ))}
      </View>
    </View>
  );
};

export default VerificationHistoryPreview;

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  title: {
    marginBottom: 10,
  },
  recentHistories: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 8,
  },
  imageContainer: {
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    backgroundColor: '#222',
    resizeMode: 'contain',
  },
  more: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#0007',
  },
  moreInnerText: {
    color: '#fff',
  },
});
