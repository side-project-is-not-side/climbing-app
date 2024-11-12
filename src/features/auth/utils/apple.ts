import appleAuth from '@invertase/react-native-apple-authentication';

export const signInApple = async () => {
  try {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);

    if (credentialState === appleAuth.State.AUTHORIZED) {
      return appleAuthRequestResponse;
    }
  } catch (err) {
    console.error('apple login err', err);
  }
};
