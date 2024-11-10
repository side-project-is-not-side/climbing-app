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
  currentLocation: CurrentLocation;
  /** 지도에서 재검색 버튼 클릭 시 설정되는 위치 값 */
  selectedLocation: Location;
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
  selectedLocation: {
    // 강남역 기준
    latitude: 37.497957666335616,
    longitude: 0.0174326,
  },
  currentBounds: {
    maxLatitude: '37.5066683',
    maxLongitude: '127.03860515',
    minLatitude: '37.489235699999995',
    minLongitude: '127.01663245',
  },
};

export const useLocationStore = create(
  combine(initialStore, set => ({
    setLocationStatus: (status: PermissionStatus) => set(prev => ({...prev, status: status})),
    setCurrentLocation: (currentLocation: CurrentLocation) => set(prev => ({...prev, currentLocation})),
    setBounds: (bounds: Bounds) => set(prev => ({...prev, currentBounds: bounds})),
    setSelectedLocation: (location: Location) => set(prev => ({...prev, selectedLocation: location})),
  })),
);
