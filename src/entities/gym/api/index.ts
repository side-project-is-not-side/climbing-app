import {GetNearestGymsRequest} from './types';
import {Bounds} from '@entities/location';
import {getUrl} from '@shared/utils';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getNearByBoulderingGyms = async (bounds: Bounds | undefined) => {
  if (!bounds) return;
  const ENDPOINT = 'v1/gyms/map';
  const url = getUrl(ENDPOINT, bounds);

  await delay(1_000);
  return await fetch(url)
    .then(async res => {
      return res.json();
    })
    .catch(error => console.log(error));
};

// 현재 위치로부터 가장 가까운 암장 두 개를 가져오는 API
export const getNearestGyms = async ({latitude, longitude}: GetNearestGymsRequest) => {
  const ENDPOINT = 'api/gyms/map';

  const url = getUrl(ENDPOINT, {
    latitude: String(latitude),
    longitude: String(longitude),
  });
  return await fetch(url).then(res => res.json());
};
