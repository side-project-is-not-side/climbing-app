import {WEB_URL} from '@shared/constants';
import {WebViewScreen} from '@shared/ui';
import React from 'react';

export const MyScreen = () => {
  return <WebViewScreen uri={WEB_URL.MY} />;
};
