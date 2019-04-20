export default class MemoryStorageService {

  constructor() {
    this.storage = {};
  }

  get(key, callback) {
    if (this.storage[key]) {
      callback({ [key]: this.storage[key] });
    }
    callback();
  }

  set(obj, callback) {
    this.storage = { ...this.structure, ...obj };
    console.log(this.storage);
    callback();
  }

}