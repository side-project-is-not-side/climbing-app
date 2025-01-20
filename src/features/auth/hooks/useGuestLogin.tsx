import {useAuthContext} from '@app/AuthContextProvider';
import {useMutateFetcher} from '@shared/hooks/useMutateFetcher';
import useSWRMutation from 'swr/mutation';

type Response = {
  accessToken: string;
  signUp: boolean;
};

export const useGuestLogin = () => {
  const auth = useAuthContext();

  const fetcher = useMutateFetcher();
  return useSWRMutation(`/v1/login/guest`, fetcher, {
    onSuccess(data: Response) {
      console.log(data);
      data.accessToken && auth?.setToken(data.accessToken);
    },
  });
};
