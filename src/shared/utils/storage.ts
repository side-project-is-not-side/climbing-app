import AsyncStorage from '@react-native-async-storage/async-storage';
import EncryptedStorage from 'react-native-encrypted-storage';

const StorageKeyMap = {
  authToken: 'Encrypted',
  onboarding: 'Async',
};

type StorageKey = keyof typeof StorageKeyMap;
type StorageType = (typeof StorageKeyMap)[StorageKey];

const getStorage = (type: StorageType) => {
  return type === 'Async' ? AsyncStorage : EncryptedStorage;
};

export const setStorage = async (key: StorageKey, data: any) => {
  const Storage = getStorage(StorageKeyMap[key]);
  return await Storage.setItem(key, JSON.stringify(data));
};

export const getStorageItem = async <T = any>(key: StorageKey) => {
  const Storage = getStorage(StorageKeyMap[key]);
  const storedData = await Storage.getItem(key);

  return storedData ? (JSON.parse(storedData) as T) : null;
};

export const removeStorage = async (key: StorageKey) => {
  const Storage = getStorage(StorageKeyMap[key]);
  return await Storage.removeItem(key);
};
