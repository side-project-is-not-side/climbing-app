import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Navigation, SWRConfigProvider,AuthContextProvider } from '@app/index';

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
    </SafeAreaProvider>
  );
}

export default App;
