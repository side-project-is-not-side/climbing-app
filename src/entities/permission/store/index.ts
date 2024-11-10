import {PermissionStatus} from 'react-native-permissions';
import {create} from 'zustand';
import {combine} from 'zustand/middleware';

type PermissionStore = {
  location?: PermissionStatus;
};

const initialStore: PermissionStore = {
  location: undefined,
};

export const usePermissionStore = create(
  combine(initialStore, set => ({
    setLocationStatus: (status: PermissionStatus) => set(prev => ({...prev, location: status})),
  })),
);
