import {Region} from '@mj-studio/react-native-naver-map';
import {Bounds} from '../api/types';

type GetBoundByRegionProps = {
  region: Region;
  scale?: number;
};

const calcMinLatByOffset = (lng: number, offset: number) => {
  const factValue = lng - offset;
  if (factValue < -90) {
    return (90 + offset) * -1;
  }
  return factValue;
};

const calcMaxLatByOffset = (lng: number, offset: number) => {
  const factValue = lng + offset;
  if (90 < factValue) {
    return (90 - offset) * -1;
  }
  return factValue;
};

const calcMinLngByOffset = (lng: number, offset: number) => {
  const factValue = lng - offset;
  if (factValue < -180) {
    return (180 + offset) * -1;
  }
  return factValue;
};

const calcMaxLngByOffset = (lng: number, offset: number) => {
  const factValue = lng + offset;
  if (180 < factValue) {
    return (180 - offset) * -1;
  }
  return factValue;
};

export const getBoundByRegion = ({
  region,
  scale = 1,
}: GetBoundByRegionProps): Bounds => {
  /*
   * Latitude : max/min +90 to -90
   * Longitude : max/min +180 to -180
   */

  const latOffset = (region.latitudeDelta / 2) * scale;
  const lngD =
    region.longitudeDelta < -180
      ? 360 + region.longitudeDelta
      : region.longitudeDelta;
  const lngOffset = (lngD / 2) * scale;

  return {
    minLongitude: calcMinLngByOffset(region.longitude, lngOffset), // westLng - min lng
    minLatitude: calcMinLatByOffset(region.latitude, latOffset), // southLat - min lat
    maxLongitude: calcMaxLngByOffset(region.longitude, lngOffset), // eastLng - max lng
    maxLatitude: calcMaxLatByOffset(region.latitude, latOffset), // northLat - max lat
  };
};
