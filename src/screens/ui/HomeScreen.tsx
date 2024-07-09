import React from 'react';
import {WebViewScreen} from '../../shared/ui';
import {WEB_URL} from '../../shared';

const HomeScreen = () => {
  return <WebViewScreen uri={WEB_URL.HOME} />;
};

export default HomeScreen;
