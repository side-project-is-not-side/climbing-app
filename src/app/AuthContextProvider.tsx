import React, {createContext, useContext, useEffect, useState} from 'react';
import {getStorage, setStorage} from '../shared/utils';

type AuthContext = {
  token: string | null;
  setToken: (token: string | null) => void;
  isFirstVisit: boolean;
  setIsFirstVisit: (isFirstVisit: boolean) => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export function AuthContextProvider({children}: {children: React.ReactNode}) {
  const [token, _setToken] = useState<string | null>(null);
  const [isFirstVisit, _setIsFirstVisit] = useState(true);

  const getToken = async () => {
    const token = await getStorage<string | null>('accessToken');
    _setToken(token);
  };

  const setToken = async (token: string | null) => {
    _setToken(token);
    await setStorage('accessToken', token);
  };

  const getIsFirstVisit = async () => {
    const isFirstVisit = await getStorage<boolean>('isFirstVisit');
    _setIsFirstVisit(isFirstVisit === null ? true : isFirstVisit);
  };

  const setIsFirstVisit = async (isFirstVisit: boolean) => {
    _setIsFirstVisit(isFirstVisit);
    await setStorage('isFirstVisit', isFirstVisit);
  };

  useEffect(() => {
    getIsFirstVisit();
    getToken();
  }, []);
  return (
    <AuthContext.Provider
      value={{token, setToken, isFirstVisit, setIsFirstVisit}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
