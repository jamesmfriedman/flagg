import { FlagglyReadOnlyStorage, FlagValue } from '../core';
import { getKey, KEY_PREFIX, mapFromStoredValuesWithPrefix } from './utils';

export const envStore = (env: {
  [key: string]: FlagValue;
}): FlagglyReadOnlyStorage => {
  const get = (flagName: string): FlagValue => env[getKey(flagName)] || null;
  return {
    name: 'envStore',
    get,
    all: () => mapFromStoredValuesWithPrefix(env, get)
  };
};
