import {signInApple} from '../utils';
import {useAuthContext} from '@app/AuthContextProvider';
import {useMutateFetcher} from '@shared/hooks/useMutateFetcher';
import {Alert} from 'react-native';
import useSWRMutation from 'swr/mutation';

export const useWithdraw = () => {
  const fetcher = useMutateFetcher();
  const {trigger} = useSWRMutation('/v1/withdraw', fetcher);
  const auth = useAuthContext();

  const getAuthorizationCode = async () => {
    const data = await signInApple();
    return data?.authorizationCode;
  };

  const handleAppleWithdraw = async () => {
    const authorizationCode = await getAuthorizationCode();

    if (!authorizationCode) return;

    try {
      await trigger(authorizationCode);
      auth?.setToken(null);
    } catch (error) {
      Alert.alert('회원탈퇴 실패', JSON.stringify(error));
    }
  };

  return {handleAppleWithdraw};
};
