import React from 'react';
import {Text, View} from 'react-native';
import Toast, {ToastConfig} from 'react-native-toast-message';

export const ToastProvider = () => {
  const toastConfig: ToastConfig = {
    alert: ({text1}) => (
      <View className="bg-[#0009] px-4 py-2 mb-20 rounded">
        <Text className="text-white text-sm">{text1}</Text>
      </View>
    ),
  };

  return <Toast config={toastConfig} position="bottom" visibilityTime={2500} />;
};
