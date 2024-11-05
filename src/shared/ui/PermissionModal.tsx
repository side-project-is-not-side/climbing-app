import {colors} from '@shared/constants';
import React, {useCallback} from 'react';
import {Linking, Modal, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';

export const PermissionModal = ({
  visible,
  hide,
  modalText,
}: {
  visible: boolean;
  hide: () => void;
  modalText: string;
}) => {
  const handleButtonPress = () => {
    Linking.openSettings();
    hide();
  };

  return (
    <SafeAreaView style={styles.centeredView}>
      <Modal animationType="fade" transparent visible={visible} onRequestClose={hide}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.contents}>
              <Text style={styles.modalText}>{modalText}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Pressable onPress={hide} style={styles.button}>
                <Text style={styles.buttonText}>확인</Text>
              </Pressable>

              <View style={{height: 'auto', width: 1, backgroundColor: '#8B8D8E'}} />
              <Pressable onPress={handleButtonPress} style={styles.button}>
                <Text style={styles.buttonText}>앱 설정으로 이동</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#191B1D',
    borderRadius: 20,
    height: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  contents: {
    flex: 1,
    paddingHorizontal: 35,
    paddingVertical: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#8B8D8E',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    elevation: 2,
  },
  buttonText: {
    color: colors.primary400,
    fontSize: 14,
    fontWeight: 700,
  },
  modalText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 700,
  },
});
