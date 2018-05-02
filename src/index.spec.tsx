import React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import App from './components/app';
import '.';

jest.mock('react-dom');
jest.mock('./components/app');

describe('Index', () => {
  it('should call render with App', () => {
    expect(render).toBeCalledWith(<App />, null);
  });
});
