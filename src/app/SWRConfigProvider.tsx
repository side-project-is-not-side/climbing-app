'use client';
import {SWRConfig} from 'swr';
import {useAuthContext} from './AuthContextProvider';

type Props = {
  children: React.ReactNode;
};

function SWRConfigProvider({children}: Props) {
  const authContext = useAuthContext();
  return (
    <SWRConfig
      value={{
        fetcher: async (url: string) => {
          const token = authContext?.token;

          try {
            const res = await fetch(`https://api.grabbers.co.kr${url}`, {
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
        },
      }}>
      {children}
    </SWRConfig>
  );
}

export default SWRConfigProvider;
