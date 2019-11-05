# Store API

If none of the built in stores suit your needs, writing your own is incredibly simple. You can look in the codebase at any of the implementations for reference, but basically you need a function to return an object with the following api surface. Stores that are read-only are only required to specify `name`, `get`, and `all`.

```typescript
const myStorage: () => {
  /** A unique name for your store */
  name: string;
  /** Takes a feature flags name and returns a value */
  get: (featureFlag: string) => FlagValue;
  /** Returns all feature flags present in the store. Note that this method can be async. */
  all: () =>
    | { [key: string]: FlagValue }
    | Promise<{ [key: string]: FlagValue }>;
  /** Sets a feature flag in the store */
  set: (featureFlag: string, value: FlagValue) => void;
  /** Removes a feature flag from the store */
  remove: (featureFlag: string) => void;
}
```

# What about Async Storage?

Flagg purposely avoids async storage since it would riddle every corner of the implementation with async / await. It also doesn't play well with frameworks that rely on synchronously reading values during render cycles (Read React, Angular, and Vue). If you must use async storage, the recommendation is to use an inMemoryStore as a proxy for all get and set actions.

```typescript
const sampleAsyncStore = (): FlaggStore => {
  const store: { [key: string]: FlagValue } = {};

  return {
    name: 'sampleAsyncStore',
    get: (flagName: string): FlagValue => store[flagName] || null,
    set: (flagName, value) => {
      // store in memory first
      store[flagName] = value;
      // save it somewhere async
      saveItAsynchronously(flagName, value);
    },
    remove: flagName => delete store[getKey(flagName)],
    all: () => store
  };
};

// init Flagg
const ff = flagg({
  definitions: {},
  store: sampleAsyncStore();
})

// Load your async values
loadAsyncStoreValues().then(res => {
  // assuming res {flagName: flagValue};
  ff.set(res)
}).then(() => {
  // the in memory object will now contain all values from the async store
  // so we can now safely call ff.get('flagName') anywhere synchronously
});
```
