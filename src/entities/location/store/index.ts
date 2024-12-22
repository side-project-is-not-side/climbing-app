import {PermissionStatus} from 'react-native-permissions';
import {create} from 'zustand';
import {combine} from 'zustand/middleware';

type Location = {
  latitude: number;
  longitude: number;
};

export type CurrentLocation = Location & {
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
  /** 실시간으로 유저 위치에 따라 설정되는 위치 값 */
  currentLocation: CurrentLocation | undefined;
  /** 지도 렌더링 후 현재 위치에 따라 설정되는 초기값 */
  initialLocation: CurrentLocation | undefined;
  currentBounds: Bounds | undefined;
};

export const LOCATION_강남역 = {
  // 강남역 기준
  latitude: 37.497957666335616,
  latitudeDelta: 0.0174326,
  longitude: 127.02761880467983,
  longitudeDelta: 0.0219727,
};

const initialStore: PermissionStore = {
  status: undefined,
  currentLocation: undefined,
  initialLocation: undefined,
  currentBounds: undefined,
};

export const useLocationStore = create(
  combine(initialStore, set => ({
    setLocationStatus: (status: PermissionStatus) => set(prev => ({...prev, status: status})),
    setCurrentLocation: (currentLocation: CurrentLocation) => set(prev => ({...prev, currentLocation})),
    setBounds: (bounds: Bounds) => set(prev => ({...prev, currentBounds: bounds})),
    setInitialLocation: (initialLocation: CurrentLocation) => set(prev => ({...prev, initialLocation})),
  })),
);
