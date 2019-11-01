export type FlagValuePrimitive = string | boolean | number | null | object;
export type FlagValue = FlagValuePrimitive | FlagValuePrimitive[];

export interface FlagDefinition {
  description?: string;
  storage?: string;
  default?: FlagValue;
}

export interface FlagDefinitions {
  [flagName: string]: FlagDefinition;
}

export interface FlagglyReadOnlyStorage {
  name: string;
  get: (featureFlag: string) => FlagValue;
  all: () => { [key: string]: FlagValue };
}

export interface FlagglyStorage extends FlagglyReadOnlyStorage {
  set: (featureFlag: string, value: FlagValue) => void;
  remove: (featureFlag: string) => void;
}

export type FlagglyStorageInput =
  | FlagglyStorage
  | FlagglyReadOnlyStorage
  | Array<FlagglyStorage | FlagglyReadOnlyStorage>;

export interface FlagglyOpts {
  storage: FlagglyStorageInput;
  definitions?: FlagDefinitions;
  hydrateFrom?: FlagglyReadOnlyStorage | Array<FlagglyReadOnlyStorage>;
}
