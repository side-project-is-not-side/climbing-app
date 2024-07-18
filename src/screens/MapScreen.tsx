import React from 'react';
import {WebViewScreen} from '../shared/ui';
import {WEB_URL} from '../shared/constants';

const HomeScreen = () => {
  // TODO: 추후 네이티브로 변경되어야 함 (NAME: 유선주)
  return <WebViewScreen uri={WEB_URL.MAP} />;
};

export default HomeScreen;
