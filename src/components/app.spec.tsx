import React from 'react';
import { shallow } from 'enzyme';
import App from './app';

describe('App', () => {
  const wrapper = shallow(<App />);

  it('should be a h1', () => {
    expect(wrapper.is('h1')).toBe(true);
  });
});
