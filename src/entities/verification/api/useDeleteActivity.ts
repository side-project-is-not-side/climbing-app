import {useAuthContext} from '@app/AuthContextProvider';
import useSWRMutation from 'swr/mutation';

export const useDeleteActivity = (id: number) => {
  const authContext = useAuthContext();

  const fetcher = async (url: string) => {
    const token = authContext?.token;

    try {
      const res = await fetch(`https://api.grabbers.co.kr${url}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        switch (res.status) {
          case 401:
          case 403:
            // 토큰 만료 또는 권한 없음
            return authContext?.setToken(null);
          default:
            return console.log('err code: ' + res.status);
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

  return useSWRMutation(`/v1/records/${id}`, fetcher, {
    onError(err) {
      console.log(err);
    },
  });
};
