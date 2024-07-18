import React from 'react';

import {Navigation} from './src/app/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AuthContextProvider} from './src/app/AuthContextProvider';

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
