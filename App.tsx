import {AuthContextProvider, Navigation, SWRConfigProvider, ToastProvider} from '@app/index';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <SWRConfigProvider>
          <GestureHandlerRootView className="font-pretendard" style={{flex: 1}}>
            <Navigation />
          </GestureHandlerRootView>
        </SWRConfigProvider>
      </AuthContextProvider>
      <ToastProvider />
    </SafeAreaProvider>
  );
}

export default App;
