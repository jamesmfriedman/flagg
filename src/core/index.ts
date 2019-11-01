import {
  FlagglyOpts,
  FlagglyStorage,
  FlagDefinition,
  FlagDefinitions,
  FlagValue,
  FlagglyReadOnlyStorage,
  FlagglyStorageInput
} from './defs';

export * from './defs';

type ReadOrWriteStorage = FlagglyStorage | FlagglyReadOnlyStorage;

const DEFAULT_STORAGE_NAME = '_default';

/** Ensures a value is an array */
const makeArray = <T>(val: T) =>
  Array.isArray(val) ? (val as T) : !!val ? ([val] as T[]) : [];

/** Takes a single or array of storage items and makes a name -> value map */
const makeStorageMap = (
  _storage: FlagglyStorageInput
): { [storageName: string]: ReadOrWriteStorage } => {
  const storageArr = makeArray(_storage) as ReadOrWriteStorage[];
  return storageArr.reduce<{
    [storageName: string]: ReadOrWriteStorage;
  }>(
    (acc, storage) => {
      acc[storage.name] = storage;
      return acc;
    },
    { [DEFAULT_STORAGE_NAME]: storageArr[0] }
  );
};

/** Get the default value for a flag from its definition */
const getFlagDefaultValue = ({ flagDef }: { flagDef: FlagDefinition }) =>
  flagDef.default === undefined ? null : flagDef.default;

/** Get the value set for the flag for its storage */
const getFlagValue = ({
  flagDef,
  flagName,
  storageMap
}: {
  flagDef: FlagDefinition;
  flagName: string;
  storageMap: { [storageName: string]: ReadOrWriteStorage };
}) => {
  const storage = resolveFlagStorage({ flagDef, storageMap });
  return storage.get(flagName);
};

/** Get the fully resolved flag value taking into account the default fallback */
const getResolvedFlagValue = ({
  definitions,
  flagName,
  storageMap
}: {
  definitions: FlagDefinitions;
  flagName: string;
  storageMap: { [storageName: string]: ReadOrWriteStorage };
}) => {
  const flagDef = getFlagDef({ definitions, flagName });

  if (!flagDef) {
    return null;
  }

  const defaultValue = getFlagDefaultValue({
    flagDef
  });

  const value = getFlagValue({
    flagDef,
    flagName,
    storageMap
  });

  if (value === undefined || value === null) {
    return defaultValue;
  }

  return value;
};

/** Get the fully resolved flag value taking into account the default fallback */
const setFlagValue = ({
  definitions,
  flagName,
  value,
  storageMap
}: {
  value: FlagValue;
  definitions: FlagDefinitions;
  flagName: string;
  storageMap: { [storageName: string]: ReadOrWriteStorage };
}) => {
  const flagDef = getFlagDef({ definitions, flagName });
  const storage = resolveFlagStorage({ flagDef, storageMap });
  const defaultValue = getFlagDefaultValue({
    flagDef
  });

  if (JSON.stringify(value) === JSON.stringify(defaultValue)) {
    /* istanbul ignore else  */
    if ('remove' in storage) {
      storage.remove(flagName);
    } else {
      console.warn(
        `Flaggly: Attempting to write to readOnly storage ${storage.name}`
      );
    }
  } else {
    if ('set' in storage) {
      storage.set(flagName, value);
    } else {
      console.warn(
        `Flaggly: Attempting to write to readOnly storage ${storage.name}`
      );
    }
  }
};

/** Get the definition for a flag */
const getFlagDef = ({
  definitions,
  flagName
}: {
  definitions: FlagDefinitions;
  flagName: string;
}) => definitions[flagName];

/** Get the storage instance for a flag definition */
const resolveFlagStorage = ({
  flagDef,
  storageMap
}: {
  flagDef: FlagDefinition;
  storageMap: { [storageName: string]: ReadOrWriteStorage };
}) => {
  const storageName = flagDef.storage || '';
  if (storageMap[storageName]) return storageMap[storageName];

  if (storageName !== undefined) {
    console.warn(
      `Flaggly storage "${storageName}" not available. Did you forget to include it? Using default storage instead.`
    );
  }
  return storageMap[DEFAULT_STORAGE_NAME];
};

/** Create a new feature flags store with Flaggly. */
export const flaggly = <FFKeys extends string>({
  storage,
  definitions: _definitions = {},
  hydrateFrom
}: FlagglyOpts) => {
  let definitions = _definitions;
  const storageMap = makeStorageMap(storage);
  const hydrateFromStorages = makeArray(
    hydrateFrom
  ) as FlagglyReadOnlyStorage[];

  const hydrate = () => {
    hydrateFromStorages.forEach(hydrateStorage => {
      set(hydrateStorage.all() as Partial<{ [key in FFKeys]: FlagValue }>);
    });
  };

  const get = (flagName: FFKeys): FlagValue =>
    getResolvedFlagValue({
      definitions,
      flagName: String(flagName),
      storageMap
    });

  const isOn = (flagName: FFKeys): boolean => !!get(flagName);

  const is = (flagName: FFKeys, value: FlagValue): boolean =>
    get(flagName) === value;

  const set = (
    flagNameOrFlags: FFKeys | Partial<{ [key in FFKeys]: FlagValue }>,
    value?: FlagValue
  ) => {
    if (typeof flagNameOrFlags === 'string') {
      value !== undefined &&
        setFlagValue({
          value,
          definitions,
          flagName: String(flagNameOrFlags),
          storageMap
        });
    } else {
      Object.entries(flagNameOrFlags).forEach(([flagName, value]) => {
        setFlagValue({
          value: value as FlagValue,
          definitions,
          flagName: String(flagName),
          storageMap
        });
      });
    }
  };

  const setDefinitions = (newDefinitions: FlagDefinitions) => {
    definitions = newDefinitions;
    hydrate();
  };

  hydrate();

  return {
    isOn,
    is,
    get,
    set,
    setDefinitions
  };
};

export default flaggly;
