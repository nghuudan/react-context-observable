import React from 'react';
import { shallow } from 'enzyme';
import { ContextStoreProvider } from '../lib';
import App from './app';

describe('App', () => {
  const wrapper = shallow(<App />);

  it('should render a ContextStoreProvider', () => {
    expect(wrapper.find(ContextStoreProvider)).toHaveLength(1);
  });
});
