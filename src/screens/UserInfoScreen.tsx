import {WEB_URL} from '@shared/constants';
import {WebViewScreen} from '@shared/ui';
import React from 'react';

const UserInfoScreen = () => {
  return <WebViewScreen uri={WEB_URL.USER_INFO} />;
};

export default UserInfoScreen;
