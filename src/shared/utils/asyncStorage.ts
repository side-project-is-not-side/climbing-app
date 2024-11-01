import AsyncStorage from '@react-native-async-storage/async-storage';

type StorageKey = 'authToken' | 'onboarding';

export const setStorage = async (key: StorageKey, data: any) => {
  return await AsyncStorage.setItem(key, JSON.stringify(data));
};

export const getStorage = async <T extends any>(key: StorageKey) => {
  const storedData = await AsyncStorage.getItem(key);

  return storedData ? (JSON.parse(storedData) as T) : null;
};

export const removeStorage = async (key: StorageKey) => {
  return await AsyncStorage.removeItem(key);
};
