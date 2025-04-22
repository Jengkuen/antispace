//@ts-nocheck
// Simple key-value store for local data
const store = {};

export default {
  async get(key) {
    return store[key];
  },
  async set(key, value) {
    store[key] = value;
    return value;
  },
  async delete(key) {
    const value = store[key];
    delete store[key];
    return value;
  }
}; 