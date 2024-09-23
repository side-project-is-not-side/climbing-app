import {AuthContextProvider, Navigation, SWRConfigProvider} from '@app/index';
import React, {useEffect} from 'react';
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
          <GestureHandlerRootView className="font-notoSans" style={{flex: 1}}>
            <Navigation />
          </GestureHandlerRootView>
        </SWRConfigProvider>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
