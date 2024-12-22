import {Coord} from '@mj-studio/react-native-naver-map';

export const checkIsOutsideSeoul = (coords: Coord): boolean => {
  // 서울시 대략적인 경계 (위도, 경도 범위)
  const SEOUL_LATITUDE_MIN = 37.413294; // 서울시 남쪽 위도
  const SEOUL_LATITUDE_MAX = 37.715133; // 서울시 북쪽 위도
  const SEOUL_LONGITUDE_MIN = 126.734086; // 서울시 서쪽 경도
  const SEOUL_LONGITUDE_MAX = 127.269311; // 서울시 동쪽 경도

  const {latitude, longitude} = coords;

  // 서울시 경계를 벗어났는지 확인
  return (
    latitude < SEOUL_LATITUDE_MIN ||
    latitude > SEOUL_LATITUDE_MAX ||
    longitude < SEOUL_LONGITUDE_MIN ||
    longitude > SEOUL_LONGITUDE_MAX
  );
};
