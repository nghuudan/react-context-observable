import * as index from '.';

describe('index', () => {
  it('should export ContextStoreProvider', () => {
    expect(index).toHaveProperty('ContextStoreProvider');
  });

  it('should export createContextStore', () => {
    expect(index).toHaveProperty('createContextStore');
  });

  it('should export withContextStore', () => {
    expect(index).toHaveProperty('withContextStore');
  });
});
