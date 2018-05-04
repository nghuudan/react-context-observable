import React from 'react';
import { Consumer } from '../contexts/message-context';
import messageStore from '../stores/message-store';

const Messages = () => (
  <div>
    <h1>Messages</h1>
    <button className="add-btn" onClick={() => messageStore.methods.addMessage({
      body: `Message_${messageStore.data.newCount}`,
      date: new Date(),
    })}>
      Add Message
    </button>
    <button className="load-btn" onClick={messageStore.methods.loadMessages}>Load Messages</button>
    <button className="remove-all-btn" onClick={messageStore.methods.removeAll}>Remove All</button>
    <ul>
      <Consumer>
        {
          ({ data, methods }) => data.messages.map((m, i) => (
            <li key={`${data.newCount}_${i}`}>
              <span>{`${m.body} - ${m.date.toUTCString()}`}</span>
              <button className="remove-btn" onClick={() => methods.removeMessage(m)}>Remove</button>
            </li>
          ))
        }
      </Consumer>
    </ul>
  </div>
);

export default Messages;
