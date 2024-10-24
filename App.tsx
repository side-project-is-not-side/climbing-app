import {AuthContextProvider, Navigation, SWRConfigProvider, ToastProvider} from '@app/index';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

function App(): React.JSX.Element {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    });
  }, []);

  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <SWRConfigProvider>
          <View style={{flex: 1, backgroundColor: '#191B1D'}}>
            <GestureHandlerRootView className="font-pretendard" style={{flex: 1}}>
              <Navigation />
            </GestureHandlerRootView>
          </View>
        </SWRConfigProvider>
      </AuthContextProvider>
      <ToastProvider />
    </SafeAreaProvider>
  );
}

export default App;
