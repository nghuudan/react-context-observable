import React from 'react';
import { shallow } from 'enzyme';
import { Subject } from 'rxjs';
import ContextStoreProvider from './context-store-provider';

jest.mock('rxjs', () => (
  {
    Subject: jest.fn(() => (
      {
        next: jest.fn(),
        subscribe: jest.fn((callback) => {
          callback();
          return {
            unsubscribe: jest.fn(),
          };
        }),
      }
    )),
  }
));

describe('ContextStoreProvider', () => {
  const Child = () => <div />;

  const store = {
    data: {},
    methods: {},
    subject: new Subject(),
  };

  const context = React.createContext(store);

  const wrapper = shallow(
    <ContextStoreProvider context={context} store={store}>
      <Child />
    </ContextStoreProvider>,
  );

  it('should render its children', () => {
    expect(wrapper.find(Child)).toHaveLength(1);
  });

  it('should subscribe to the subject', () => {
    expect(store.subject.subscribe).toBeCalled();
  });

  it('should unsubscribe on componentWillUnmount', () => {
    const instance: any = wrapper.instance();
    instance.componentWillUnmount();
    expect(instance.storeSubscription.unsubscribe).toBeCalled();
  });

  it('should not call unsubscribe if storeSubscription is falsey', () => {
    const instance: any = wrapper.instance();
    const mockUnsubscribe = instance.storeSubscription.unsubscribe;
    mockUnsubscribe.mockClear();
    instance.storeSubscription = null;
    instance.componentWillUnmount();
    expect(mockUnsubscribe).not.toBeCalled();
  });
});
