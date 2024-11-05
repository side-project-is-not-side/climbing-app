import {RouteProp, useRoute} from '@react-navigation/native';
import {MYPAGE_LINKS, MyRoute} from '@shared/constants';
import {WebViewScreen} from '@shared/ui';
import React from 'react';

export const ExternalPageScreen = () => {
  const route = useRoute<RouteProp<MyRoute, 'external_page'>>();
  const {name} = route.params;

  const LINK = MYPAGE_LINKS[name];

  return <WebViewScreen uri={LINK} />;
};
