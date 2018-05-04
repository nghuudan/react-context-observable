import React from 'react';
import { shallow } from 'enzyme';
import { Consumer } from '../contexts/message-context';
import messageStore from '../stores/message-store';
import Messages from './messages';

jest.mock('../contexts/message-context', () => {
  const props = {
    data: {
      messages: [
        {
          body: 'test',
          date: new Date(),
        },
      ],
    },
    methods: {
      removeMessage: jest.fn(),
    },
  };
  return {
    Consumer: jest.fn(({ children }) => children(props)),
  };
});

jest.mock('../stores/message-store');

describe('Messages', () => {
  const wrapper = shallow(<Messages />);

  wrapper.find(Consumer).dive();

  it('should be a div', () => {
    expect(wrapper.is('div')).toBe(true);
  });

  it('should handle onClick for Add Message button', () => {
    wrapper.find('.add-btn').simulate('click');
    expect(messageStore.methods.addMessage).toBeCalled();
  });

  it('should handle onClick for Load Messages button', () => {
    wrapper.find('.load-btn').simulate('click');
    expect(messageStore.methods.loadMessages).toBeCalled();
  });

  it('should handle onClick for Remove All button', () => {
    wrapper.find('.remove-all-btn').simulate('click');
    expect(messageStore.methods.removeAll).toBeCalled();
  });
});
