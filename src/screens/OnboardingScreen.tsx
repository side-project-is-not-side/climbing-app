import {AuthRoute, WEB_URL} from '../shared/constants';
import {WebViewScreen} from '../shared/ui';
import {useAuthContext} from '@app/AuthContextProvider';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';

type ScreenProps = NativeStackScreenProps<AuthRoute, 'onboarding'>;

const OnboardingScreen = ({navigation}: ScreenProps) => {
  const authContext = useAuthContext();
  if (!authContext) return <></>;

  const {onboarding} = authContext;

  useEffect(() => {
    if (onboarding) {
      navigation.navigate('login');
    }
  }, [onboarding]);
  return <WebViewScreen uri={WEB_URL.ONBOARDING} />;
};

export default OnboardingScreen;
