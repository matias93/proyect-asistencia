import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import StoreProvider from './store/index';

const App = () => (
  <StoreProvider>
    <AppNavigator />
  </StoreProvider>
);

export default App;
