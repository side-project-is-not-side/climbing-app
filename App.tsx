import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthContextProvider, SWRConfigProvider, Navigation} from './src/app';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): React.JSX.Element {
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
