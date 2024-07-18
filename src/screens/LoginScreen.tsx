import React from 'react';
import {WebViewScreen} from '../shared/ui';
import {WEB_URL} from '../shared/constants';

const LoginScreen = () => {
  return <WebViewScreen uri={WEB_URL.LOGIN} />;
};

export default LoginScreen;
