import {useAuthContext} from '@app/AuthContextProvider';

export const useMutateFetcher = () => {
  const authContext = useAuthContext();

  return async (url: string, {arg}: {arg: any}) => {
    const token = authContext?.token;

    try {
      const res = await fetch(`https://api.grabbers.co.kr${url}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(arg),
      });

      if (!res.ok) {
        switch (res.status) {
          case 401:
          case 403:
            // 토큰 만료 또는 권한 없음
            return authContext?.setToken(null);
          default:
            return res.json();
        }
      }

      const contentType = res.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) {
        return res.json();
      } else {
        return res.text();
      }
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  };
};
