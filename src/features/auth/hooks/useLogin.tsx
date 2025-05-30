import {useAuthContext} from '@app/AuthContextProvider';
import appleAuth from '@invertase/react-native-apple-authentication';
import {login} from '@react-native-seoul/kakao-login';
import {useMutateFetcher} from '@shared/hooks/useMutateFetcher';
import useSWRMutation from 'swr/mutation';

type Provider = 'KAKAO' | 'APPLE';

type Response = {
  accessToken: string;
  signUp: boolean;
};

export const useLogin = () => {
  const auth = useAuthContext();

  const fetcher = useMutateFetcher();
  const {trigger} = useSWRMutation(`/v1/oauth2/login`, fetcher);

  const signInWithKakao = async () => {
    try {
      const token = await login();
      return token.idToken;
    } catch (err) {
      console.error('kakao login err', err);
    }
  };

  const SignInWithApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const {identityToken} = appleAuthRequestResponse;
        console.log(appleAuthRequestResponse);

        if (identityToken) {
          return identityToken;
        } else {
          // 오류 처리
        }
      }
    } catch (err) {
      console.error('apple login err', err);
    }
  };

  return async (provider: Provider) => {
    const getIdToken = async () => {
      switch (provider) {
        case 'KAKAO':
          return await signInWithKakao();
        case 'APPLE':
          return await SignInWithApple();
      }
    };

    const idToken = await getIdToken();

    trigger(
      {provider, token: idToken},
      {
        onSuccess(data: Response) {
          data.accessToken && auth?.setToken(data.accessToken);
        },
      },
    );
  };
};
