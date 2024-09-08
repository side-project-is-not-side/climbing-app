export const getUrl = (url: string, params: Record<string, string>) => {
  const queryParams = new URLSearchParams(params);
  const apiUrl = `https://${process.env.API_HOST}/${url}?${queryParams}`;
  return apiUrl;
};

export const getUrlWithoutHost = (url: string, params: Record<string, string>) => {
  const queryParams = new URLSearchParams(params);
  const apiUrl = `${url}?${queryParams}`;
  return apiUrl;
};
