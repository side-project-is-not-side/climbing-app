import {useNavigation} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {colors} from '../constants';
import {Icon} from './';

const ModalLayout = ({children}: {children: React.ReactNode}) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackground: () => (
        <Pressable
          onPress={navigation.goBack}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            width: '100%',
            height: '100%',
          }}></Pressable>
      ),
    });
  }, []);
  return (
    <View style={{flex: 1}}>
      <Pressable
        style={[StyleSheet.absoluteFill, styles.background]}
        onPress={navigation.goBack}
      />
      <View style={styles.modalContainer}>
        <Pressable style={styles.xButtonContainer} onPress={navigation.goBack}>
          <Icon name="X" size={24} />
        </Pressable>
        {children}
      </View>
    </View>
  );
};

export default ModalLayout;

const styles = StyleSheet.create({
  background: {backgroundColor: 'rgba(0, 0, 0, 0.3)'},
  modalContainer: {
    width: '100%',
    maxHeight: '95%',
    position: 'absolute',
    bottom: 0,
    padding: 20,
    gap: 2,
    backgroundColor: colors.gray700,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  xButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
});
