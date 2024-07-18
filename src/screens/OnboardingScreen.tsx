import React from 'react';
import {WebViewScreen} from '../shared/ui';
import {WEB_URL} from '../shared/constants';

const OnboardingScreen = () => {
  return <WebViewScreen uri={WEB_URL.ONBOARDING} />;
};

export default OnboardingScreen;
