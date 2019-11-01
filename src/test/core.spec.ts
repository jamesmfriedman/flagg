import { flaggly } from '../core';

import { localStore } from '../storage/local-store';
import { inMemoryStore } from '../storage/in-memory-store';
import { sessionStore } from '../storage/session-store';
import { safeParseJSON } from '../storage/utils';
import { urlStore } from '../storage/url-store';
import { envStore } from '../storage/env-store';

const definitions = {
  testFlag: {},
  'testFlag.withDefault': {
    default: 'hello world'
  },
  'testFlag.withDefaultArray': {
    default: ['a', 'b', 'c']
  },
  'testFlag.withDefaultObject': {
    default: {
      a: true,
      b: true,
      c: true
    }
  },
  'testFlag.withSpecificStorage': {
    storage: 'localStore'
  }
};

const storages = [localStore(), inMemoryStore(), sessionStore()];

process.env['ff.testFlag'] = 'ENV_VALUE';

describe('Flaggly Core', () => {
  afterEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('isOn: no default', () => {
    for (const storage of storages) {
      const featureFlags = flaggly<keyof typeof definitions>({
        definitions,
        storage
      });

      expect(featureFlags.isOn('testFlag')).toBe(false);
    }
  });

  it('isOn: with default', () => {
    for (const storage of storages) {
      const featureFlags = flaggly<keyof typeof definitions>({
        definitions,
        storage
      });

      expect(featureFlags.isOn('testFlag.withDefault')).toBe(true);
    }
  });

  it('is: no default', () => {
    for (const storage of storages) {
      const featureFlags = flaggly<keyof typeof definitions>({
        definitions,
        storage
      });

      expect(featureFlags.is('testFlag', null)).toBe(true);
    }
  });

  it('is: with default', () => {
    for (const storage of storages) {
      const featureFlags = flaggly<keyof typeof definitions>({
        definitions,
        storage
      });

      expect(featureFlags.is('testFlag.withDefault', 'hello world')).toBe(true);
    }
  });

  it('get: no default', () => {
    for (const storage of storages) {
      const featureFlags = flaggly<keyof typeof definitions>({
        definitions,
        storage
      });

      expect(featureFlags.get('testFlag')).toBe(null);
    }
  });

  it('get: with default', () => {
    for (const storage of storages) {
      const featureFlags = flaggly<keyof typeof definitions>({
        definitions,
        storage
      });

      expect(featureFlags.get('testFlag.withDefault')).toBe('hello world');
    }
  });

  it('set', () => {
    for (const storage of storages) {
      const featureFlags = flaggly<keyof typeof definitions>({
        definitions,
        storage
      });

      featureFlags.set('testFlag', 'I SET THIS');
      expect(featureFlags.get('testFlag')).toBe('I SET THIS');

      featureFlags.set('testFlag.withDefault', 'hello world');
    }
  });

  it('set many at once', () => {
    for (const storage of storages) {
      const featureFlags = flaggly<keyof typeof definitions>({
        definitions,
        storage
      });

      featureFlags.set({
        testFlag: 'Multiple 1',
        'testFlag.withDefault': 'Multiple 2'
      });

      expect(featureFlags.get('testFlag')).toBe('Multiple 1');
      expect(featureFlags.get('testFlag.withDefault')).toBe('Multiple 2');
    }
  });

  it('handles arrays', () => {
    for (const storage of storages) {
      const featureFlags = flaggly<keyof typeof definitions>({
        definitions,
        storage
      });

      expect(featureFlags.get('testFlag.withDefaultArray')).toEqual([
        'a',
        'b',
        'c'
      ]);

      featureFlags.set('testFlag.withDefaultArray', ['d', 'e', 'f']);

      expect(featureFlags.get('testFlag.withDefaultArray')).toEqual([
        'd',
        'e',
        'f'
      ]);
    }
  });

  it('handles objects', () => {
    for (const storage of storages) {
      const featureFlags = flaggly<keyof typeof definitions>({
        definitions,
        storage
      });

      expect(featureFlags.get('testFlag.withDefaultObject')).toEqual({
        a: true,
        b: true,
        c: true
      });

      featureFlags.set('testFlag.withDefaultObject', {
        a: false,
        b: false,
        c: false
      });

      expect(featureFlags.get('testFlag.withDefaultObject')).toEqual({
        a: false,
        b: false,
        c: false
      });
    }
  });

  it('storage all() works', () => {
    [
      inMemoryStore(),
      envStore({}),
      urlStore(''),
      localStore(),
      sessionStore()
    ].forEach(storage => {
      expect(storage.all()).toEqual({});
    });
  });

  it('specific storage: missing storage returns default storage', () => {
    const featureFlags = flaggly<keyof typeof definitions>({
      definitions,
      storage: [inMemoryStore(), sessionStore()]
    });

    const spyWarn = jest.spyOn(console, 'warn');
    featureFlags.get('testFlag.withSpecificStorage');
    expect(spyWarn).toHaveBeenCalled();
    spyWarn.mockReset();
  });

  it('specific storage: works', () => {
    const featureFlags = flaggly<keyof typeof definitions>({
      definitions,
      storage: [inMemoryStore(), localStore()]
    });

    featureFlags.set('testFlag.withSpecificStorage', 'myStorage');
    expect(featureFlags.get('testFlag.withSpecificStorage')).toBe('myStorage');
  });

  it('urlStore: works', () => {
    const featureFlags = flaggly<keyof typeof definitions>({
      definitions,
      storage: urlStore(
        '?ff={%22testFlag%22:%22urlIsWorking%22}&anotherVar=foo'
      ),
      hydrateFrom: urlStore(
        '?ff={%22testFlag%22:%22urlIsWorking%22}&anotherVar=foo'
      )
    });
    expect(featureFlags.get('testFlag')).toBe('urlIsWorking');
    expect(featureFlags.get('testFlag.withDefault')).toBe('hello world');
    expect(featureFlags.get('na' as any)).toBe(null);
  });

  it('urlStore: has fallback', () => {
    const featureFlags = flaggly<keyof typeof definitions>({
      definitions,
      hydrateFrom: urlStore(''),
      storage: inMemoryStore()
    });

    expect(featureFlags.get('testFlag')).toBe(null);
  });

  it('envStore: works', () => {
    const featureFlags = flaggly<keyof typeof definitions>({
      definitions,
      hydrateFrom: envStore(process.env),
      storage: envStore(process.env)
    });

    expect(featureFlags.get('testFlag')).toBe('ENV_VALUE');
    expect(featureFlags.get('testFlag.withDefault')).toBe('hello world');
    expect(featureFlags.get('na' as any)).toBe(null);
  });

  it('safeParseJSON', () => {
    expect(safeParseJSON(null)).toBe(null);
    expect(safeParseJSON('{')).toBe('{');
  });

  it('lets definitions be set asynchronously', done => {
    const featureFlags = flaggly<keyof typeof definitions>({
      storage: inMemoryStore()
    });

    expect(featureFlags.get('testFlag.withDefault')).toBe(null);

    // faking async
    setTimeout(() => {
      featureFlags.setDefinitions(definitions);
      expect(featureFlags.get('testFlag.withDefault')).toBe('hello world');
      done();
    }, 100);
  });
});
