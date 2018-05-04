# react-context-observable
React context store for state with Observables

- [Context Store](#context-store)
- [React Context](#react-context)
- [Context Store Provider](#context-store-provider)

## Context Store
```javascript
import { createContextStore } from 'react-context-observable';

const exampleStore = createContextStore({
  data: {
    examples: [
      {
        id: 1,
        title: 'Example'
      }
    ]
  },
  methods: {
    addExample(example) {
      this.data.examples = [...this.data.examples, example];
    },
    fetchExample(id) {
      fetch(`https://example.com/examples/${id}`)
        .then(response => response.json())
        .then(example => this.methods.addExample(example));
    },
    removeExample(id) {
      this.data.examples = this.data.examples.filter(example => example.id !== id);
    }
  },
});

export default exampleStore;
```

## React Context
```javascript
import { createContext } from 'react';
import exampleStore from '../stores/example-store';

const exampleContext = createContext(exampleStore);

export const { Consumer, Provider } = exampleContext;
export default exampleContext;
```

## Context Store Provider
```javascript
import React from 'react';
import { render } from 'react-dom';
import { ContextStoreProvider } from 'react-context-observable';
import exampleContext, { Consumer } from '../contexts/example-context';
import exampleStore from '../stores/example-store';

const Examples = () => {
  <ul>
    <Consumer>
      {
        ({ data, methods }) => data.examples.map(example => (
          <li key={example.id}>
            {example.title}
            <button onClick={() => methods.removeExample(example.id)}>
              Remove
            </button>
          </li>
        ))
      }
    </Consumer>
  </ul>
};

const App = () => (
  <ContextStoreProvider context={exampleContext} store={exampleStore}>
    <Examples />
    <button onClick={() => exampleStore.methods.fetchExample(2)}>
      Fetch Example 2
    </button>
  </ContextStoreProvider>
);

render(<App />, document.getElementById('app'));
```
