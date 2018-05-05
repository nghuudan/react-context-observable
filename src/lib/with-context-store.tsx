import React, { Context } from 'react';
import { ContextStore } from './create-context-store';
import ContextStoreProvider from './context-store-provider';

export const withContextStore = (
  context: Context<any>,
  store: ContextStore<any, any>,
) => (WrappedComponent: any) => () => (
  <ContextStoreProvider context={context} store={store}>
    <WrappedComponent />
  </ContextStoreProvider>
);

export default withContextStore;
