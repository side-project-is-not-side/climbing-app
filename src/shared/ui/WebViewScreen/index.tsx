import {useAuthContext} from '../../../app/AuthContextProvider';
import {AllRoute, BASE_URL, KAKAO_AUTH_URL, KAKAO_LOGIN_URL, LINKING_URI, ROOT_ROUTES, WEB_URL} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Linking, NativeModules, Platform, ViewStyle} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import WebViewComponent, {WebViewNavigation} from 'react-native-webview';
import {ShouldStartLoadRequest, WebViewMessageEvent} from 'react-native-webview/lib/WebViewTypes';

type WebViewProps = {
  uri?: string;
  html?: string;
  style?: ViewStyle;
  token?: string | null;
} & React.ComponentProps<typeof WebViewComponent>;

const WEBVIEW_URLS = [BASE_URL, KAKAO_LOGIN_URL, KAKAO_AUTH_URL];
const WebViewScreen = (props: React.PropsWithChildren<WebViewProps>) => {
  const {uri, html, style, ...rest} = props;

  const _webview = React.useRef<WebViewComponent>(null);
  const navigation = useNavigation<NativeStackNavigationProp<AllRoute>>();
  const authContext = useAuthContext();

  const [ua, setUa] = React.useState('');

  const token = authContext?.token;

  const localeURI = React.useMemo(() => {
    if (/(\:3000)|(grabbers\.co\.kr)/.test(uri ?? '')) {
      const path = uri?.slice(-1)[0];

      return `${uri}/${path ?? ''}`;
    }

    return uri;
  }, [uri]);

  React.useEffect(() => {
    DeviceInfo.getUserAgent().then(ua => {
      setUa(ua + '-grabbers-');
    });
  }, [uri]);

  React.useEffect(() => {
    if (Platform.OS === 'android' && token) {
      NativeModules.CookieManager?.setCookie(uri || '', `accessToken=${token};`, (error: any) => {
        if (error) {
          console.error(error);
        }
      });
    }

    return () => {
      // _webview.current.
    };
  }, [token]);

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    const navLinks = Object.values(LINKING_URI);
    console.log({url: navState.url});

    if (!navState.url.includes(BASE_URL) && !navState.url.includes('kakao')) {
      Linking.openURL(navState.url);
      return;
    }

    const path = navState.url.replace(`${BASE_URL}/`, '').split('?')[0];
    if (navLinks.includes(path as any) && path !== 'login' && path !== 'my/user-info') {
      navigation.navigate(path as any);
    }
    if (path === '') {
      navigation.navigate(ROOT_ROUTES.HOME);
    }
  };

  const onShouldStartLoadWithRequest = (event: ShouldStartLoadRequest) => {
    if (event.url.startsWith('grabbers://') || !WEBVIEW_URLS.some(webviewUrl => event.url.includes(webviewUrl))) {
      Linking.openURL(event.url);
      return false;
    }

    return true;
  };

  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === 'NAVIGATE') {
      const {route, id} = data.data;
      console.log(route);
      navigation.navigate(route, {id});
    }

    if (data.type === 'STORAGE_DATA') {
      const {key, data: item} = data.data;

      if (key === 'accessToken') {
        return authContext?.setToken(item);
      }
      if (key === 'isFirstVisit') {
        return authContext?.setIsFirstVisit(item);
      }
    }

    if (data.type === 'LOGOUT') {
      authContext?.setToken(null);
    }
  };

  return (
    <WebViewComponent
      ref={_webview}
      // source={{uri: uri ?? WEB_URL.HOME}}
      scalesPageToFit={true}
      source={{
        ...(html ? {html} : {uri: uri ? uri : WEB_URL.HOME}),
        headers: {
          Cookie: `accessToken=${token}; native-os=${Platform.OS};`,
        },
      }}
      injectedJavaScript={`
      (function() {
        document.cookie = "accessToken=${token};"
        document.cookie = "native-os=${Platform.OS};"

    })();true;
    `}
      onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
      onNavigationStateChange={onNavigationStateChange}
      onMessage={onMessage}
      style={[{flex: 1}, style]}
      webviewDebuggingEnabled={true}
      userAgent={ua}
      sharedCookiesEnabled={false}
      originWhitelist={['*']}
      allowsInlineMediaPlayback={true}
      setSupportMultipleWindows={true}
      javaScriptEnabled={true}
      javaScriptCanOpenWindowsAutomatically={true}
      domStorageEnabled={true}
      {...rest}
    />
  );
};

export default WebViewScreen;
