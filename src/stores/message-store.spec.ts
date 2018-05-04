import { combineLatest } from 'rxjs';
import messageStore from './message-store';

jest.useFakeTimers();

jest.mock('rxjs', () => {
  const subscribeMock = jest.fn(callback => callback([{}]));

  const observerMock = {
    next: jest.fn(),
  };

  return {
    combineLatest: jest.fn(() => (
      {
        subscribe: subscribeMock,
      }
    )),
    Observable: jest.fn(callback => callback(observerMock)),
    Subject: jest.fn(() => (
      {
        next: jest.fn(),
      }
    )),
  };
});

describe('messageStore', () => {
  it('should be an object', () => {
    expect(messageStore).toBeInstanceOf(Object);
  });

  describe('data', () => {
    it('should have a messages property', () => {
      expect(messageStore.data).toHaveProperty('messages');
    });

    it('should have a newCount property', () => {
      expect(messageStore.data).toHaveProperty('newCount');
    });
  });

  describe('methods', () => {
    it('should add a message', () => {
      const message = {
        body: 'test',
        date: new Date(),
      };
      messageStore.methods.addMessage(message);
      expect(messageStore.data.messages.some(m => m === message)).toBe(true);
    });

    it('should increment newCount', () => {
      const newCount = messageStore.data.newCount;
      const message = {
        body: 'test',
        date: new Date(),
      };
      messageStore.methods.addMessage(message);
      expect(messageStore.data.newCount).toBe(newCount + 1);
    });

    it('should call combineLatest', () => {
      messageStore.methods.loadMessages();
      expect(combineLatest).toBeCalled();
    });

    it('should call subscribe on combineLatest', () => {
      messageStore.methods.loadMessages();
      expect(combineLatest().subscribe).toBeCalled();
    });

    it('should call setTimeout', () => {
      jest.runAllTimers();
      expect(setTimeout).toBeCalled();
    });

    it('should remove all messages', () => {
      messageStore.methods.removeAll();
      expect(messageStore.data.messages).toHaveLength(0);
    });

    it('should remove the message it finds by equality', () => {
      const message = {
        body: '',
        date: new Date(),
      };
      messageStore.methods.addMessage(message);
      messageStore.methods.removeMessage(message);
      expect(messageStore.data.messages.some(m => m === message)).toBe(false);
    });
  });
});
