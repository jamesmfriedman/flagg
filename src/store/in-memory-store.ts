import { FlaggStore, FlagValue } from '../core';

export const inMemoryStore = (): FlaggStore => {
  const store: { [key: string]: FlagValue } = {};

  return {
    name: 'inMemoryStore',
    get: (flagName: string): FlagValue => store[flagName] || null,
    set: (flagName, value) => {
      store[flagName] = value;
    },
    remove: flagName => delete store[flagName],
    all: () => store
  };
};
