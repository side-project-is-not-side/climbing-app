import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthContextProvider, SWRConfigProvider, Navigation} from './src/app';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <SWRConfigProvider>
          <Navigation />
        </SWRConfigProvider>
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
