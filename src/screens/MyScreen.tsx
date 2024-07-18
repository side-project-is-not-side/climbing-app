import React from 'react';
import {WebViewScreen} from '../shared/ui';
import {WEB_URL} from '../shared/constants';

const MyScreen = () => {
  return <WebViewScreen uri={WEB_URL.MY} />;
};

export default MyScreen;
