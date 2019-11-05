import {
  FlaggOpts,
  FlaggStore,
  FlagDefinition,
  FlagDefinitions,
  FlagValue,
  FlaggReadOnlyStore,
  FlaggStoreInput
} from './defs';
import { inMemoryStore } from '../store';

export * from './defs';

type ReadOrWriteStore = FlaggStore | FlaggReadOnlyStore;

const DEFAULT_STORE_NAME = '__default';
const FROZEN_STORE_NAME = '__frozen';

/** Ensures a value is an array */
const makeArray = <T>(val: T) =>
  Array.isArray(val) ? (val as T) : !!val ? ([val] as T[]) : [];

/** Takes a single or array of store items and makes a name -> value map */
const makeStoreMap = (
  _store: FlaggStoreInput
): { [storeName: string]: ReadOrWriteStore } => {
  const storeArr = makeArray(_store) as ReadOrWriteStore[];
  return storeArr.reduce<{
    [storeName: string]: ReadOrWriteStore;
  }>(
    (acc, store) => {
      acc[store.name] = store;
      return acc;
    },
    { [DEFAULT_STORE_NAME]: storeArr[0], [FROZEN_STORE_NAME]: inMemoryStore() }
  );
};

/** Get the default value for a flag from its definition */
const getFlagDefaultValue = ({ flagDef }: { flagDef: FlagDefinition }) =>
  flagDef.default === undefined ? null : flagDef.default;

/** Get the value set for the flag for its store */
const getFlagValue = ({
  flagDef,
  flagName,
  storeMap
}: {
  flagDef: FlagDefinition;
  flagName: string;
  storeMap: { [storeName: string]: ReadOrWriteStore };
}) => {
  const store = resolveFlagStore({ flagDef, storeMap });
  return store.get(flagName);
};

/** Get the fully resolved flag value taking into account the default fallback */
const getResolvedFlagValue = ({
  frozen,
  definitions,
  flagName,
  storeMap
}: {
  frozen: { [key: string]: true };
  definitions: FlagDefinitions;
  flagName: string;
  storeMap: { [storeName: string]: ReadOrWriteStore };
}) => {
  if (flagName in frozen) {
    return storeMap[FROZEN_STORE_NAME].get(flagName);
  }

  const flagDef = getFlagDef({ definitions, flagName });

  const defaultValue = getFlagDefaultValue({
    flagDef
  });

  const value = getFlagValue({
    flagDef,
    flagName,
    storeMap
  });

  if (value === undefined || value === null) {
    return defaultValue;
  }

  return value;
};

/** Get the fully resolved flag value taking into account the default fallback */
const setFlagValue = ({
  frozen,
  definitions,
  flagName,
  value,
  storeMap
}: {
  frozen: { [key: string]: true };
  value: FlagValue;
  definitions: FlagDefinitions;
  flagName: string;
  storeMap: { [storeName: string]: ReadOrWriteStore };
}) => {
  if (flagName in frozen) {
    console.warn(`Feature Flag ${flagName} is frozen`);
    return;
  }

  const flagDef = getFlagDef({ definitions, flagName });
  const store = resolveFlagStore({ flagDef, storeMap });
  const defaultValue = getFlagDefaultValue({
    flagDef
  });

  if (JSON.stringify(value) === JSON.stringify(defaultValue)) {
    /* istanbul ignore else  */
    if ('remove' in store) {
      store.remove(flagName);
    } else {
      console.warn(
        `Flagg: Attempting to write to readOnly store ${store.name}`
      );
    }
  } else {
    if ('set' in store) {
      store.set(flagName, value);
    } else {
      console.warn(
        `Flagg: Attempting to write to readOnly store ${store.name}`
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
}) => (flagName in definitions ? definitions[flagName] : {});

/** Get the store instance for a flag definition */
const resolveFlagStore = ({
  flagDef,
  storeMap
}: {
  flagDef: FlagDefinition;
  storeMap: { [storeName: string]: ReadOrWriteStore };
}) => {
  const storeName = flagDef.store as string;
  if (storeMap[storeName]) return storeMap[storeName];

  if (storeName !== undefined) {
    console.warn(
      `Flagg store "${storeName}" not available. Did you forget to include it? Using default store instead.`
    );
  }
  return storeMap[DEFAULT_STORE_NAME];
};

const getFlagType = ({ flagDef }: { flagDef: FlagDefinition }) => {
  if (flagDef.options) {
    return 'select';
  }

  if (typeof flagDef.default === 'string') {
    return 'string';
  }

  return 'boolean';
};

/** Create a new feature flags store with Flagg. */
export const flagg = <FFKeys extends string>({
  store,
  definitions = {},
  hydrateFrom
}: FlaggOpts) => {
  const state: {
    frozen: { [key: string]: true };
    definitions: FlagDefinitions;
    storeMap: { [storeName: string]: ReadOrWriteStore };
  } = {
    definitions,
    frozen: {},
    storeMap: makeStoreMap(store)
  };

  const hydrateFromStores = makeArray(hydrateFrom) as FlaggReadOnlyStore[];

  const hydrate = () => {
    hydrateFromStores.forEach(async hydrateStore => {
      const values = await hydrateStore.all();
      set(values as Partial<{ [key in FFKeys]: FlagValue }>);
    });
  };

  const get = (flagName: FFKeys): FlagValue =>
    getResolvedFlagValue({
      frozen: state.frozen,
      definitions: state.definitions,
      flagName: String(flagName),
      storeMap: state.storeMap
    });

  const getDefault = (flagName: FFKeys): FlagValue =>
    getFlagDefaultValue({
      flagDef: getFlagDef({ definitions: state.definitions, flagName })
    });

  const set = (
    flagNameOrFlags: FFKeys | Partial<{ [key in FFKeys]: FlagValue }>,
    value?: FlagValue
  ) => {
    if (typeof flagNameOrFlags === 'string') {
      setFlagValue({
        frozen: state.frozen,
        value: value as FlagValue,
        definitions: state.definitions,
        flagName: String(flagNameOrFlags),
        storeMap: state.storeMap
      });
    } else {
      Object.entries(flagNameOrFlags).forEach(([flagName, value]) => {
        setFlagValue({
          frozen: state.frozen,
          value: value as FlagValue,
          definitions: state.definitions,
          flagName: String(flagName),
          storeMap: state.storeMap
        });
      });
    }
  };

  const isOverridden = (flagName: FFKeys) => {
    const flagDef = getFlagDef({ flagName, definitions: state.definitions });
    const type = getFlagType({ flagDef });
    return type === 'boolean'
      ? !!get(flagName) !== !!getDefault(flagName)
      : get(flagName) !== getDefault(flagName);
  };

  const setDefinitions = (definitions: FlagDefinitions) => {
    state.definitions = definitions;
    hydrate();
  };

  const getDefinitions = () => state.definitions;

  const getAllResolved = () => {
    return Object.keys(state.definitions).reduce<
      Partial<{ [key in FFKeys]: FlagValue }>
    >((acc, flagName) => {
      acc[flagName as FFKeys] = get(flagName as FFKeys);
      return acc;
    }, {});
  };

  const getAllOverridden = () => {
    return Object.keys(state.definitions).reduce<
      Partial<{ [key in FFKeys]: FlagValue }>
    >((acc, flagName) => {
      if (isOverridden(flagName as FFKeys)) {
        acc[flagName as FFKeys] = get(flagName as FFKeys);
      }
      return acc;
    }, {});
  };

  const freeze = (flagName: FFKeys) => {
    (state.storeMap[FROZEN_STORE_NAME] as FlaggStore).set(
      flagName,
      get(flagName)
    );
    state.frozen[flagName] = true;
  };

  const freezeAll = () => {
    Object.keys(state.definitions).forEach(flagName =>
      freeze(flagName as FFKeys)
    );
  };

  const isFrozen = (flagName: FFKeys) => !!state.frozen[flagName];

  hydrate();

  return {
    /** Gets a value for a feature flag. */
    get,
    /** Sets one or many feature flags. */
    set,
    /** Get the default value for a feature flag. */
    getDefault,
    /** Checks to see if a feature flag is overridden. */
    isOverridden,
    /** Set the definitions after init. */
    setDefinitions,
    /** Gets the current set  of definitions. */
    getDefinitions,
    /** Gets all feature flags with their resolved value. */
    getAllResolved,
    /** Get only the feature flags that are different than their defaults. */
    getAllOverridden,
    /** Freeze a feature flag to prevent further changes. */
    freeze,
    /** Freeze all feature flags. */
    freezeAll,
    /** Check if a feature flag is frozen. */
    isFrozen
  };
};

export default flagg;
