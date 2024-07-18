import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthContextProvider, Navigation} from './src/app';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
        <Navigation />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}

export default App;
