import { flagg } from '../core';

import { localStore } from '../store/local-store';
import { inMemoryStore } from '../store/in-memory-store';
import { sessionStore } from '../store/session-store';
import { safeParseJSON } from '../store/utils';
import { urlStore } from '../store/url-store';
import { envStore } from '../store/env-store';

const definitions = {
  testFlag: {},
  testFlag_withDefault: {
    default: 'hello world'
  },
  testFlag_withDefaultArray: {
    default: ['a', 'b', 'c']
  },
  testFlag_withDefaultObject: {
    default: {
      a: true,
      b: true,
      c: true
    }
  },
  testFlag_withSpecificStore: {
    store: 'localStore'
  },
  trueFlag: {},
  falseFlag: {}
};

const stores = [localStore(), inMemoryStore(), sessionStore()];

process.env['ff_testFlag'] = 'ENV_VALUE';
process.env['ff_falseFlag'] = 'false';
process.env['ff_trueFlag'] = 'true';

describe('Flagg Core', () => {
  afterEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it('get: default', () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.getDefault('testFlag_withDefault')).toBe('hello world');
    }
  });

  it('get: definitions', () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.getDefinitions()).toEqual(definitions);
    }
  });

  it('get: non existent', () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.get('foo' as any)).toBe(null);
    }
  });

  it('get: no default', () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.get('testFlag')).toBe(null);
    }
  });

  it('get: with default', () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.get('testFlag_withDefault')).toBe('hello world');
    }
  });

  it('getAllOverridden', () => {
    for (const store of stores) {
      const ff = flagg({
        definitions: {
          one: {
            default: 'one'
          },
          two: {
            default: 'two'
          }
        },
        store
      });

      ff.set('one', 'foo');

      expect(ff.getAllOverridden()).toEqual({ one: 'foo' });
    }
  });

  it('getAllResolved', () => {
    for (const store of stores) {
      const ff = flagg({
        definitions: {
          one: {
            default: 'one'
          },
          two: {
            default: 'two'
          }
        },
        store
      });

      ff.set('one', 'foo');

      expect(ff.getAllResolved()).toEqual({ one: 'foo', two: 'two' });
    }
  });

  it('set', () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      ff.set('testFlag', 'I SET THIS');
      expect(ff.get('testFlag')).toBe('I SET THIS');

      ff.set('testFlag_withDefault', 'hello world');
    }
  });

  it('set many at once', () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      ff.set({
        testFlag: 'Multiple 1',
        testFlag_withDefault: 'Multiple 2'
      });

      expect(ff.get('testFlag')).toBe('Multiple 1');
      expect(ff.get('testFlag_withDefault')).toBe('Multiple 2');
    }
  });

  it('handles arrays', () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.get('testFlag_withDefaultArray')).toEqual(['a', 'b', 'c']);

      ff.set('testFlag_withDefaultArray', ['d', 'e', 'f']);

      expect(ff.get('testFlag_withDefaultArray')).toEqual(['d', 'e', 'f']);
    }
  });

  it('handles objects', () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.get('testFlag_withDefaultObject')).toEqual({
        a: true,
        b: true,
        c: true
      });

      ff.set('testFlag_withDefaultObject', {
        a: false,
        b: false,
        c: false
      });

      expect(ff.get('testFlag_withDefaultObject')).toEqual({
        a: false,
        b: false,
        c: false
      });
    }
  });

  it('store all() works', () => {
    [
      inMemoryStore(),
      envStore({}),
      urlStore(''),
      localStore(),
      sessionStore()
    ].forEach(store => {
      expect(store.all()).toEqual({});
    });
  });

  it('specific store: missing store returns default store', () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: [inMemoryStore(), sessionStore()]
    });

    const spyWarn = jest.spyOn(console, 'warn');
    ff.get('testFlag_withSpecificStore');
    expect(spyWarn).toHaveBeenCalled();
    spyWarn.mockReset();
  });

  it('specific store: works', () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: [inMemoryStore(), localStore()]
    });

    ff.set('testFlag_withSpecificStore', 'myStore');
    expect(ff.get('testFlag_withSpecificStore')).toBe('myStore');
  });

  it('urlStore: works', async done => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: urlStore('?ff={%22testFlag%22:%22urlIsWorking%22}&anotherVar=foo')
    });

    await ff.hydrateFrom(
      urlStore('?ff={%22testFlag%22:%22urlIsWorking%22}&anotherVar=foo')
    );
    expect(ff.get('testFlag')).toBe('urlIsWorking');
    expect(ff.get('testFlag_withDefault')).toBe('hello world');
    expect(ff.get('na' as any)).toBe(null);
    done();
  });

  it('urlStore: has fallback', async done => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: inMemoryStore()
    });

    await ff.hydrateFrom(urlStore(''));
    expect(ff.get('testFlag')).toBe(null);
    done();
  });

  it('envStore: works', async done => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: envStore(process.env)
    });

    await ff.hydrateFrom(envStore(process.env as any));
    expect(ff.get('testFlag')).toBe('ENV_VALUE');
    expect(ff.get('falseFlag')).toBe(false);
    expect(ff.get('trueFlag')).toBe(true);
    expect(ff.get('testFlag_withDefault')).toBe('hello world');
    expect(ff.get('na' as any)).toBe(null);
    done();
  });

  it('safeParseJSON', () => {
    expect(safeParseJSON(null)).toBe(null);
    expect(safeParseJSON('{')).toBe('{');
  });

  it('lets definitions be set asynchronously', done => {
    const ff = flagg<keyof typeof definitions>({
      store: inMemoryStore()
    });

    expect(ff.get('testFlag_withDefault')).toBe(null);

    // faking async
    setTimeout(() => {
      ff.setDefinitions(definitions);
      expect(ff.get('testFlag_withDefault')).toBe('hello world');
      done();
    }, 100);
  });

  it('isOverridden', () => {
    for (const store of stores) {
      const ff = flagg({
        definitions: {
          one: {
            default: false
          },
          two: {
            default: 'hello'
          },
          three: {
            default: 'hello',
            options: ['hello', 'there']
          }
        },
        store
      });
      ff.set('one', true);
      ff.set('two', 'foo');
      ff.set('three', 'there');

      expect(ff.isOverridden('one')).toBe(true);
      expect(ff.isOverridden('two')).toBe(true);
      expect(ff.isOverridden('three')).toBe(true);
    }
  });

  it('can freeze', () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: inMemoryStore()
    });

    const spyWarn = jest.spyOn(console, 'warn');

    ff.set('testFlag', true);
    ff.freeze('testFlag');
    expect(ff.get('testFlag')).toBe(true);
    expect(ff.isFrozen('testFlag')).toBe(true);
    ff.set('testFlag', false);
    expect(ff.get('testFlag')).toBe(true);

    expect(spyWarn).toHaveBeenCalled();
  });

  it('can freezeAll', () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: inMemoryStore()
    });

    const spyWarn = jest.spyOn(console, 'warn');

    ff.set('testFlag', true);
    ff.freezeAll();
    expect(ff.get('testFlag')).toBe(true);
    ff.set('testFlag', false);
    expect(ff.get('testFlag')).toBe(true);

    expect(spyWarn).toHaveBeenCalled();
  });

  it('can reset', () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: inMemoryStore()
    });

    ff.set('testFlag', true);
    expect(ff.get('testFlag')).toBe(true);

    ff.reset('testFlag');
    expect(ff.get('testFlag')).toBe(null);
  });

  it('can resetAll', () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: inMemoryStore()
    });

    ff.set('testFlag', true);
    expect(ff.get('testFlag')).toBe(true);

    ff.resetAll();
    expect(ff.get('testFlag')).toBe(null);
  });
});
