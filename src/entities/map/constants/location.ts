// 위치를 불러오지 못하면 강남역 기준으로 위치를 잡습니다.
export const INITIAL_CENTER = {
  latitude: 37.4979517,
  longitude: 127.0276188,
};

export const ZOOM_LEVEL = {
  국가: 6,
  시도: 9,
  시군구: 12,
  읍면동: 14,
  거리: 16,
  부동산: 20,
} as const;

export const DEFAULT_ZOOM = ZOOM_LEVEL.읍면동;
