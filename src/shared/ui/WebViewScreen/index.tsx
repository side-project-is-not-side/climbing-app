import {useAuthContext} from '../../../app/AuthContextProvider';
import {
  AllRoute,
  BASE_URL,
  KAKAO_AUTH_URL,
  KAKAO_LOGIN_URL,
  LINKING_URI,
  MYPAGE_LINKS,
  NOTION_URLS,
  ROOT_ROUTES,
  WEB_URL,
  userAgent,
} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Linking, Platform, View, ViewStyle} from 'react-native';
import WebViewComponent, {WebViewNavigation} from 'react-native-webview';
import {ShouldStartLoadRequest, WebViewMessageEvent} from 'react-native-webview/lib/WebViewTypes';

type WebViewProps = {
  uri?: string;
  html?: string;
  style?: ViewStyle;
  token?: string | null;
} & React.ComponentProps<typeof WebViewComponent>;

const WEBVIEW_URLS = [BASE_URL, KAKAO_LOGIN_URL, KAKAO_AUTH_URL, ...NOTION_URLS];

const WebViewScreen = (props: React.PropsWithChildren<WebViewProps>) => {
  const {uri, html, style, ...rest} = props;

  const _webview = React.useRef<WebViewComponent>(null);
  const navigation = useNavigation<NativeStackNavigationProp<AllRoute>>();
  const authContext = useAuthContext();

  const token = authContext?.token;

  const onNavigationStateChange = (navState: WebViewNavigation) => {
    const navLinks = Object.values(LINKING_URI);

    if (!WEBVIEW_URLS.some(webviewUrl => navState.url.includes(webviewUrl))) {
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
    try {
      const data = JSON.parse(event.nativeEvent.data);

      switch (data.type) {
        case 'NAVIGATE': {
          const {route, isStack, parent, ...params} = data.data;

          if (isStack && parent) {
            navigation.navigate(parent, {
              screen: route,
              params,
            });
          } else {
            navigation.navigate(route, params);
          }
          break;
        }
        case 'STORAGE_DATA': {
          const {key, data: item} = data.data;
          if (key === 'Onboarding') {
            return authContext?.setOnboarding(item);
          }
          break;
        }
        case 'LOGOUT': {
          authContext?.logout(data.data);
          break;
        }
        case 'WITHDRAW': {
          authContext?.withdraw(data.data);
          break;
        }
        case 'CONSOLE_LOG': {
          console.log(data.data);
          break;
        }
        default:
          console.warn('Unhandled message type:', data.type);
      }
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <WebViewComponent
        ref={_webview}
        scalesPageToFit={true}
        source={{
          ...(html ? {html} : {uri: uri ? uri : WEB_URL.HOME}),
          headers: {
            Cookie: `accessToken=${token}; native-os=${Platform.OS};`,
          },
        }}
        injectedJavaScript={`
          (function() {
            document.cookie = "accessToken=${token};";
            document.cookie = "native-os=${Platform.OS};";
          })();
          document.body.style.userSelect = 'none';
          document.body.style.webkitUserSelect = 'none';
          document.body.style.mozUserSelect = 'none';
          document.body.style.msUserSelect = 'none';
          true;
        `}
        onLoadEnd={() => {
          if (token) {
            _webview.current?.injectJavaScript(`
              (function() {
                const token = '${token}';
                document.cookie = 'accessToken=' + token + '; Secure; SameSite=Strict; path=/';
                window.dispatchEvent(new CustomEvent('tokenReceived', { detail: token }));
              })();
              true;
            `);
          }
        }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        onNavigationStateChange={navState => {
          onNavigationStateChange(navState);
        }}
        onMessage={onMessage}
        style={[{flex: 1, backgroundColor: '#191B1D'}, style]}
        userAgent={userAgent}
        sharedCookiesEnabled={true}
        originWhitelist={['*']}
        allowsInlineMediaPlayback={true}
        setSupportMultipleWindows={true}
        javaScriptEnabled={true}
        javaScriptCanOpenWindowsAutomatically={true}
        domStorageEnabled={true}
        {...rest}
      />
    </View>
  );
};

export default WebViewScreen;
