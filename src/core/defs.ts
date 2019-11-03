export type FlagValuePrimitive = string | boolean | number | null | object;
export type FlagValue = FlagValuePrimitive | FlagValuePrimitive[];

export interface FlagDefinition {
  description?: string;
  storage?: string;
  default?: FlagValue;
  options?: string[];
}

export interface FlagDefinitions {
  [flagName: string]: FlagDefinition;
}

export interface FlaggReadOnlyStorage {
  name: string;
  get: (featureFlag: string) => FlagValue;
  all: () =>
    | { [key: string]: FlagValue }
    | Promise<{ [key: string]: FlagValue }>;
}

export interface FlaggStorage extends FlaggReadOnlyStorage {
  set: (featureFlag: string, value: FlagValue) => void;
  remove: (featureFlag: string) => void;
}

export type FlaggStorageInput =
  | FlaggStorage
  | FlaggReadOnlyStorage
  | Array<FlaggStorage | FlaggReadOnlyStorage>;

export interface FlaggOpts {
  storage: FlaggStorageInput;
  definitions?: FlagDefinitions;
  hydrateFrom?: FlaggReadOnlyStorage | Array<FlaggReadOnlyStorage>;
}
