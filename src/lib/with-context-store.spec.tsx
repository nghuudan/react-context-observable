import React from 'react';
import { shallow } from 'enzyme';
import { Subject } from 'rxjs';
import ContextStoreProvider from './context-store-provider';
import withContextStore from './with-context-store';

describe('withContextStore', () => {
  const Child = () => <div />;

  const store = {
    data: {},
    methods: {},
    subject: new Subject(),
  };

  const context = React.createContext(store);
  const ContextWrapper = withContextStore(context, store)(Child);
  const wrapper = shallow(<ContextWrapper />);

  it('should return a function', () => {
    expect(withContextStore(context, store)).toBeInstanceOf(Function);
  });

  it('should return a function which returns a component', () => {
    expect(ContextWrapper).toBeInstanceOf(Function);
  });

  it('should render its children', () => {
    expect(wrapper.find(Child)).toHaveLength(1);
  });
});
