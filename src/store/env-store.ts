import { FlaggReadOnlyStore, FlagValue } from "../core";
import { getKey, mapFromStoredValuesWithPrefix } from "./utils";

export const envStore = (env: any): FlaggReadOnlyStore => {
  const get = (flagName: string): FlagValue => env[getKey(flagName)] || null;
  return {
    name: "envStore",
    get,
    all: () => mapFromStoredValuesWithPrefix(env, get)
  };
};
