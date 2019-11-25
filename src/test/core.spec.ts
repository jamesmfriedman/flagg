import { flagg } from "../core";

import { localStore } from "../store/local-store";
import { inMemoryStore } from "../store/in-memory-store";
import { sessionStore } from "../store/session-store";
import { safeParseJSON } from "../store/utils";
import { urlStore } from "../store/url-store";
import { envStore } from "../store/env-store";

const definitions = {
  testFlag: {},
  "testFlag.withDefault": {
    default: "hello world"
  },
  "testFlag.withDefaultArray": {
    default: ["a", "b", "c"]
  },
  "testFlag.withDefaultObject": {
    default: {
      a: true,
      b: true,
      c: true
    }
  },
  "testFlag.withSpecificStore": {
    store: "localStore"
  }
};

const stores = [localStore(), inMemoryStore(), sessionStore()];

process.env["ff.testFlag"] = "ENV_VALUE";

describe("Flagg Core", () => {
  afterEach(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  it("get: default", () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.getDefault("testFlag.withDefault")).toBe("hello world");
    }
  });

  it("get: definitions", () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.getDefinitions()).toEqual(definitions);
    }
  });

  it("get: non existent", () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.get("foo" as any)).toBe(null);
    }
  });

  it("get: no default", () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.get("testFlag")).toBe(null);
    }
  });

  it("get: with default", () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.get("testFlag.withDefault")).toBe("hello world");
    }
  });

  it("getAllOverridden", () => {
    for (const store of stores) {
      const ff = flagg({
        definitions: {
          one: {
            default: "one"
          },
          two: {
            default: "two"
          }
        },
        store
      });

      ff.set("one", "foo");

      expect(ff.getAllOverridden()).toEqual({ one: "foo" });
    }
  });

  it("getAllResolved", () => {
    for (const store of stores) {
      const ff = flagg({
        definitions: {
          one: {
            default: "one"
          },
          two: {
            default: "two"
          }
        },
        store
      });

      ff.set("one", "foo");

      expect(ff.getAllResolved()).toEqual({ one: "foo", two: "two" });
    }
  });

  it("set", () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      ff.set("testFlag", "I SET THIS");
      expect(ff.get("testFlag")).toBe("I SET THIS");

      ff.set("testFlag.withDefault", "hello world");
    }
  });

  it("set many at once", () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      ff.set({
        testFlag: "Multiple 1",
        "testFlag.withDefault": "Multiple 2"
      });

      expect(ff.get("testFlag")).toBe("Multiple 1");
      expect(ff.get("testFlag.withDefault")).toBe("Multiple 2");
    }
  });

  it("handles arrays", () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.get("testFlag.withDefaultArray")).toEqual(["a", "b", "c"]);

      ff.set("testFlag.withDefaultArray", ["d", "e", "f"]);

      expect(ff.get("testFlag.withDefaultArray")).toEqual(["d", "e", "f"]);
    }
  });

  it("handles objects", () => {
    for (const store of stores) {
      const ff = flagg<keyof typeof definitions>({
        definitions,
        store
      });

      expect(ff.get("testFlag.withDefaultObject")).toEqual({
        a: true,
        b: true,
        c: true
      });

      ff.set("testFlag.withDefaultObject", {
        a: false,
        b: false,
        c: false
      });

      expect(ff.get("testFlag.withDefaultObject")).toEqual({
        a: false,
        b: false,
        c: false
      });
    }
  });

  it("store all() works", () => {
    [
      inMemoryStore(),
      envStore({}),
      urlStore(""),
      localStore(),
      sessionStore()
    ].forEach(store => {
      expect(store.all()).toEqual({});
    });
  });

  it("specific store: missing store returns default store", () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: [inMemoryStore(), sessionStore()]
    });

    const spyWarn = jest.spyOn(console, "warn");
    ff.get("testFlag.withSpecificStore");
    expect(spyWarn).toHaveBeenCalled();
    spyWarn.mockReset();
  });

  it("specific store: works", () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: [inMemoryStore(), localStore()]
    });

    ff.set("testFlag.withSpecificStore", "myStore");
    expect(ff.get("testFlag.withSpecificStore")).toBe("myStore");
  });

  it("urlStore: works", () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: urlStore("?ff={%22testFlag%22:%22urlIsWorking%22}&anotherVar=foo")
    });

    ff.hydrateFrom(
      urlStore("?ff={%22testFlag%22:%22urlIsWorking%22}&anotherVar=foo")
    );
    expect(ff.get("testFlag")).toBe("urlIsWorking");
    expect(ff.get("testFlag.withDefault")).toBe("hello world");
    expect(ff.get("na" as any)).toBe(null);
  });

  it("urlStore: has fallback", () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: inMemoryStore()
    });

    ff.hydrateFrom(urlStore(""));

    expect(ff.get("testFlag")).toBe(null);
  });

  it("envStore: works", () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: envStore(process.env)
    });

    ff.hydrateFrom(envStore(process.env as any));
    expect(ff.get("testFlag")).toBe("ENV_VALUE");
    expect(ff.get("testFlag.withDefault")).toBe("hello world");
    expect(ff.get("na" as any)).toBe(null);
  });

  it("safeParseJSON", () => {
    expect(safeParseJSON(null)).toBe(null);
    expect(safeParseJSON("{")).toBe("{");
  });

  it("lets definitions be set asynchronously", done => {
    const ff = flagg<keyof typeof definitions>({
      store: inMemoryStore()
    });

    expect(ff.get("testFlag.withDefault")).toBe(null);

    // faking async
    setTimeout(() => {
      ff.setDefinitions(definitions);
      expect(ff.get("testFlag.withDefault")).toBe("hello world");
      done();
    }, 100);
  });

  it("isOverridden", () => {
    for (const store of stores) {
      const ff = flagg({
        definitions: {
          one: {
            default: false
          },
          two: {
            default: "hello"
          },
          three: {
            default: "hello",
            options: ["hello", "there"]
          }
        },
        store
      });
      ff.set("one", true);
      ff.set("two", "foo");
      ff.set("three", "there");

      expect(ff.isOverridden("one")).toBe(true);
      expect(ff.isOverridden("two")).toBe(true);
      expect(ff.isOverridden("three")).toBe(true);
    }
  });

  it("can freeze", () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: inMemoryStore()
    });

    const spyWarn = jest.spyOn(console, "warn");

    ff.set("testFlag", true);
    ff.freeze("testFlag");
    expect(ff.get("testFlag")).toBe(true);
    expect(ff.isFrozen("testFlag")).toBe(true);
    ff.set("testFlag", false);
    expect(ff.get("testFlag")).toBe(true);

    expect(spyWarn).toHaveBeenCalled();
  });

  it("can freezeAll", () => {
    const ff = flagg<keyof typeof definitions>({
      definitions,
      store: inMemoryStore()
    });

    const spyWarn = jest.spyOn(console, "warn");

    ff.set("testFlag", true);
    ff.freezeAll();
    expect(ff.get("testFlag")).toBe(true);
    ff.set("testFlag", false);
    expect(ff.get("testFlag")).toBe(true);

    expect(spyWarn).toHaveBeenCalled();
  });
});
