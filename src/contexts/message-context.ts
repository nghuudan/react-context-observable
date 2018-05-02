import React from 'react';
import messageStore from '../stores/message-store';

const context = React.createContext(messageStore);

export const { Consumer, Provider } = context;
export default context;
