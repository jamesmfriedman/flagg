# Typescript

Flagg is written in Typescript and doesn't require much configuration to get type safety out of the box.

# Definition

You can pass a list of valid keys as a union to the `flagg` init function. The simplest way to do this is have your definitions as their own object and then extract the keys. This will make all access to flagNames typesafe which is incredibly useful to avoid typos, and to clean up flags when you delete ones no longer in use.

```typescript
const definitions = {
  myFeatureFlag: {},
  anotherFlag: {}/
}

const ff = flagg<keyof typeof definitions>({
  definitions,
  store: inMemoryStore()
});

ff.get('myFeatureFlag'); // works
ff.get('anotherFlag'); // works
ff.get('areYouThere'); // ERROR!
```

# Type Safety with React Hooks

Because React hooks don't have any context of the feature flag types, they only take in strings for flag names. You can get around this limitation by wrapping them in a type safe function of your own definition.

```tsx
import {useFeatureFlag as ffUseFeatureFlag, FlagValue} from 'flagg/react';

const definitions = {
  myFeatureFlag: {},
  anotherFlag: {}/
}

export const useFeatureFlag = <T extends FlagValue>(
  flagName: keyof typeof definitions
) => ffUseFeatureFlag<T>(flagName);

function App() {
  const [myFeatureFlag] = useFeatureFlag('myFeatureFlag') // works
  const [areYouThere] = useFeatureFlag('areYouThere') // ERROR
  return <div></div>
}
```


