import React from 'react';
import { Subscription } from 'rxjs';
import { ContextStore } from './create-context-store';

export interface ContextStoreProps {
  context: React.Context<any>;
  store: ContextStore<any, any>;
}

export interface ContextStoreState {
  store: ContextStore<any, any>;
}

export default class ContextStoreProvider extends React.Component<ContextStoreProps, ContextStoreState> {
  storeSubscription?: Subscription;

  constructor(props: ContextStoreProps) {
    super(props);
    this.state = { store: props.store };
  }

  componentDidMount() {
    this.storeSubscription = this.props.store.subject.subscribe((data) => {
      this.setState({
        store: { ...this.state.store, data },
      });
    });
  }

  componentWillUnmount() {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  render() {
    const {
      children,
      context: { Provider },
    } = this.props;

    return (
      <Provider value={this.state.store}>
        {children}
      </Provider>
    );
  }
}
