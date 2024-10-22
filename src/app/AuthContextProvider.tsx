import {getStorage, setStorage} from '../shared/utils';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';

type AuthContext = {
  token: string | null;
  getToken: () => Promise<string | null>;
  setToken: (token: string | null) => void;
  onboarding: boolean;
  setOnboarding: (onboarding: boolean) => void;
};

const AuthContext = createContext<AuthContext | null>(null);

export function AuthContextProvider({children}: {children: React.ReactNode}) {
  const [isLoading, setIsLoading] = useState(true);

  const [token, _setToken] = useState<string | null>(null);
  const [onboarding, _setOnboarding] = useState(false);

  const getToken = async () => {
    const token = await getStorage<string | null>('accessToken');
    _setToken(token);
    return token;
  };

  const setToken = async (token: string | null) => {
    _setToken(token);
    await setStorage('accessToken', token);
  };

  const getOnboarding = async () => {
    const onboarding = await getStorage<boolean>('onboarding');
    _setOnboarding(!!onboarding);
  };

  const setOnboarding = async (onboarding: boolean) => {
    _setOnboarding(onboarding);
    await setStorage('onboarding', onboarding);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await getOnboarding();
        await getToken();
      } catch (err) {
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading)
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <AuthContext.Provider value={{token, getToken, setToken, onboarding, setOnboarding}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
