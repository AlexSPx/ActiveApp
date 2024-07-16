import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'user-storage',
});

export const storageValidation = new MMKV({
  id: 'user-storage',
});
