export const getLatLongDelta = (zoom: number, latitude: number): number[] => {
  const LONGITUDE_DELTA = +Math.exp(Math.log(360) - zoom * Math.LN2).toFixed(7);
  const ONE_LATITUDE_DEGREE_IN_METERS = 111.32 * 1_000;
  const accurateRegion =
    LONGITUDE_DELTA *
    (ONE_LATITUDE_DEGREE_IN_METERS * Math.cos(latitude * (Math.PI / 180)));
  const LATITUDE_DELTA = +(
    accurateRegion / ONE_LATITUDE_DEGREE_IN_METERS
  ).toFixed(7);

  return [LATITUDE_DELTA, LONGITUDE_DELTA];
};
