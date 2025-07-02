export const creater = () => {
  const store = {};

  const remove = (key) => (delete store[key]);
  const registry = new FinalizationRegistry(remove);

  const get = (key) => {
    const { [key]: value } = store;

    return value?.deref?.();
  };

  const del = (key) => {
    remove(key);
  };

  const set = (key, value) => {
    registry.register(value, key);
    store[key] = new WeakRef(value);
  };

  return { get, set, del };
};

export default creater();
