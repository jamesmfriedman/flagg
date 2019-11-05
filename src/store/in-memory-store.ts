import { FlaggStore, FlagValue } from '../core';
import { getKey } from './utils';

export const inMemoryStore = (): FlaggStore => {
  const store: { [key: string]: FlagValue } = {};

  return {
    name: 'inMemoryStore',
    get: (flagName: string): FlagValue => store[flagName] || null,
    set: (flagName, value) => {
      store[flagName] = value;
    },
    remove: flagName => delete store[getKey(flagName)],
    all: () => store
  };
};
