export type FlagValuePrimitive = string | boolean | number | null | object;
export type FlagValue = FlagValuePrimitive | FlagValuePrimitive[];

export interface FlagDefinition {
  /** An optional description to understand what the feature flag is for. */
  description?: string;
  /** Specify which store this feature flag should use. */
  store?: string;
  /** A default value for your feature flag. */
  default?: FlagValue;
  /** An array of options to present as a dropdown in the admin. */
  options?: string[];
}

export interface FlagDefinitions {
  [flagName: string]: FlagDefinition;
}

export interface FlaggReadOnlyStore {
  name: string;
  get: (featureFlag: string) => FlagValue;
  all: () =>
    | { [key: string]: FlagValue }
    | Promise<{ [key: string]: FlagValue }>;
}

export interface FlaggStore extends FlaggReadOnlyStore {
  set: (featureFlag: string, value: FlagValue) => void;
  remove: (featureFlag: string) => void;
}

export type FlaggStoreInput =
  | FlaggStore
  | FlaggReadOnlyStore
  | Array<FlaggStore | FlaggReadOnlyStore>;

export interface FlaggOpts {
  /** One or more storage mechanisms for your feature flags. */
  store: FlaggStoreInput;
  /** Feature flag definitions. */
  definitions?: FlagDefinitions;
  /** One or more stores to hydrate from. See the docs on Stores. */
  hydrateFrom?: FlaggReadOnlyStore | Array<FlaggReadOnlyStore>;
}
