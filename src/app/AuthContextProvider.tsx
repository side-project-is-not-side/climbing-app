import {clearStorage, getStorage, setStorage} from '../shared/utils';
import appleAuth from '@invertase/react-native-apple-authentication';
import {logout as KakaoLogout, unlink} from '@react-native-seoul/kakao-login';
import React, {createContext, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';

type AuthProvider = 'KAKAO' | 'APPLE';

type AuthContext = {
  token: string | null;
  getToken: () => Promise<string | null>;
  setToken: (token: string | null) => void;
  onboarding: boolean;
  setOnboarding: (onboarding: boolean) => void;
  logout: (provider?: AuthProvider) => void;
  withdraw: (provider: AuthProvider) => void;
};

const AuthContext = createContext<AuthContext | null>(null);

const AUTHTOKEN = 'authToken';
const ONBOARDING = 'onboarding';

export function AuthContextProvider({children}: {children: React.ReactNode}) {
  const [isLoading, setIsLoading] = useState(true);

  const [token, _setToken] = useState<string | null>(null);
  const [onboarding, _setOnboarding] = useState(false);

  const getToken = async () => {
    const token = await getStorage<string | null>(AUTHTOKEN);
    _setToken(token);
    return token;
  };

  const setToken = async (token: string | null) => {
    await setStorage(AUTHTOKEN, token);
    _setToken(token);
  };

  const getOnboarding = async () => {
    const onboarding = await getStorage<boolean>(ONBOARDING);
    _setOnboarding(!!onboarding);
  };

  const setOnboarding = async (onboarding: boolean) => {
    await setStorage(ONBOARDING, onboarding);
    _setOnboarding(onboarding);
  };

  const logout = async (provider?: AuthProvider) => {
    switch (provider) {
      case 'KAKAO':
        KakaoLogout();
        break;
      case 'APPLE':
        // 애플 로그아웃
        break;
    }

    await setStorage(AUTHTOKEN, null);
    _setToken(null);

    console.log('logout with ' + provider || 'token');
  };

  const withdraw = async (provider: AuthProvider) => {
    switch (provider) {
      case 'KAKAO':
        unlink();
        break;
      case 'APPLE':
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGOUT,
        });

        const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

        if (credentialState === appleAuth.State.REVOKED) {
          //애플 로그아웃 완료
        }
        break;
    }

    await clearStorage();
    _setToken(null);
    _setOnboarding(false);

    console.log('withdraw with ' + provider);
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
    <AuthContext.Provider value={{token, getToken, setToken, onboarding, setOnboarding, logout, withdraw}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
