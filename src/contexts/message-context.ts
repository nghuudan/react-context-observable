import { createContext } from 'react';
import messageStore from '../stores/message-store';

const context = createContext(messageStore);

export const { Consumer, Provider } = context;
export default context;
