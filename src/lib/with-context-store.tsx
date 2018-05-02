import React from 'react';
import { Subscription } from 'rxjs';
import { ContextStore, ContextStoreBase } from './create-context-store';
import ContextStoreProvider from './context-store-provider';

export const withContextStore = (
  context: React.Context<any>,
  store: ContextStore<any, any>,
) => (WrappedComponent: any) => () => (
  <ContextStoreProvider context={context} store={store}>
    <WrappedComponent />
  </ContextStoreProvider>
);

export default withContextStore;
