import { FlaggReadOnlyStore, FlagValue } from '../core';
import { getKey, mapFromStoredValuesWithPrefix, safeParseJSON } from './utils';

export const envStore = (env: any): FlaggReadOnlyStore => {
  const get = (flagName: string): FlagValue =>
    safeParseJSON(env[getKey(flagName)] || null);
  return {
    name: 'envStore',
    get,
    all: () => mapFromStoredValuesWithPrefix(env, get)
  };
};
