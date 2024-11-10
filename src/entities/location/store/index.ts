import {PermissionStatus} from 'react-native-permissions';
import {create} from 'zustand';
import {combine} from 'zustand/middleware';

export type CurrentLocation = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};

export type Bounds = {
  minLatitude: string;
  maxLatitude: string;
  minLongitude: string;
  maxLongitude: string;
};

type PermissionStore = {
  status?: PermissionStatus;
  currentLocation: CurrentLocation;
  currentBounds: Bounds;
};

const initialStore: PermissionStore = {
  status: undefined,
  currentLocation: {
    // 강남역 기준
    latitude: 37.497957666335616,
    latitudeDelta: 0.0174326,
    longitude: 127.02761880467983,
    longitudeDelta: 0.0219727,
  },
  currentBounds: {
    maxLatitude: '37.48873278025675',
    maxLongitude: '126.99368285009503',
    minLatitude: '37.47129598025675',
    minLongitude: '126.97171015009503',
  },
};

export const useLocationStore = create(
  combine(initialStore, set => ({
    setLocationStatus: (status: PermissionStatus) => set(prev => ({...prev, status: status})),
    setCurrentLocation: (currentLocation: CurrentLocation) => set(prev => ({...prev, currentLocation})),
    setBounds: (bounds: Bounds) => set(prev => ({...prev, currentBounds: bounds})),
  })),
);
