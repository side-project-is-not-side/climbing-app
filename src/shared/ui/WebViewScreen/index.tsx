import React from 'react';
import WebViewComponent from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import {Platform, ViewStyle, NativeModules, Linking} from 'react-native';
import {WEB_URL} from '../../constants';

type WebViewProps = {
  uri?: string;
  html?: string;
  style?: ViewStyle;
  token?: string | null;
} & React.ComponentProps<typeof WebViewComponent>;

const WebViewScreen = (props: React.PropsWithChildren<WebViewProps>) => {
  const {uri, html, style, token, ...rest} = props;
  const [ua, setUa] = React.useState('');

  const _webview = React.useRef<WebViewComponent>(null);

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
      NativeModules.CookieManager.setCookie(
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
        ...(html ? {html} : {uri: uri ? localeURI ?? uri : WEB_URL.HOME}),
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
      style={[{flex: 1}, style]}
      webviewDebuggingEnabled={true}
      userAgent={ua}
      sharedCookiesEnabled={false}
      originWhitelist={['*']}
      allowsInlineMediaPlayback={true}
      setSupportMultipleWindows={false}
      {...rest}
    />
  );
};

export default WebViewScreen;
