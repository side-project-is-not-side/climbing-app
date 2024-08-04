import React from 'react';
import WebViewComponent from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import {Platform, ViewStyle, NativeModules, Linking} from 'react-native';
import {AllRoute, BASE_URL, LINKING_URI, WEB_URL} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useAuthContext} from '../../../app/AuthContextProvider';

type WebViewProps = {
  uri?: string;
  html?: string;
  style?: ViewStyle;
  token?: string | null;
} & React.ComponentProps<typeof WebViewComponent>;

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
      NativeModules.CookieManager?.setCookie(
        uri || '',
        `accessToken=${token};`,
        (error: any) => {
          if (error) {
            console.error(error);
          }
        },
      );
    }

    return () => {
      // _webview.current.
    };
  }, [token]);

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
      onShouldStartLoadWithRequest={event => {
        if (event.url.startsWith('tethermax://')) {
          Linking.openURL(event.url);
          return false;
        }

        return true;
      }}
      onNavigationStateChange={event => {
        const navLinks = Object.values(LINKING_URI);
        const path = event.url.replace(`${BASE_URL}/`, '').split('?')[0];
        if (navLinks.includes(path as any) && path !== 'login') {
          navigation.navigate(path as any);
        }
        if (path === '') {
          navigation.navigate('홈');
        }
      }}
      onMessage={event => {
        const data = JSON.parse(event.nativeEvent.data);

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
      }}
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
