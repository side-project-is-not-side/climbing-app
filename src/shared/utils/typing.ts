type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type TypedObject = Record<string, unknown>;

const getTypedEntries = <T extends TypedObject>(obj: T) => {
  return Object.entries(obj) as Entries<T>;
};

const getTypedKeys = <T extends TypedObject>(obj: T) => {
  const typedKeys = Object.keys(obj) as Array<keyof T>;
  return typedKeys;
};

export const ObjectTyped = {
  entries: getTypedEntries,
  keys: getTypedKeys,
};
