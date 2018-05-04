import React from 'react';
import { ContextStoreProvider } from '../lib';
import context from '../contexts/message-context';
import store from '../stores/message-store';
import Messages from './messages';

const App = () => (
  <ContextStoreProvider context={context} store={store}>
    <Messages />
  </ContextStoreProvider>
);

export default App;
