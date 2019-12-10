import { FlagValue } from '../core';

export const KEY_PREFIX = 'ff';
export const KEY_DELIMETER = '_';

export const getKey = (key: string) => KEY_PREFIX + KEY_DELIMETER + key;

export const safeParseJSON = (value: any): FlagValue => {
  try {
    return JSON.parse(value);
  } catch (err) {}
  return value;
};

const hasPrefix = (key: string) => key.startsWith(KEY_PREFIX + KEY_DELIMETER);

const removePrefix = (key: string) => key.slice(KEY_PREFIX.length + 1);

export const mapFromStoredValuesWithPrefix = (
  stored: {
    [key: string]: FlagValue;
  },
  getter: (flagName: string) => FlagValue
) => {
  return Object.entries(stored).reduce<{ [key: string]: FlagValue }>(
    (acc, [key, value]) => {
      if (hasPrefix(key)) {
        const flagName = removePrefix(key);
        acc[flagName] = getter(flagName);
      }
      return acc;
    },
    {}
  );
};
