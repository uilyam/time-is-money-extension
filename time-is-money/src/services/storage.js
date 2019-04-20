import MemoryStorageService from "./memory-storage";

export default class Storage {

  constructor() {
    this.backed = undefined;
  }

  retrieve(key) {
    return new Promise(
      (resolve, reject) => {
        try {
          this.getBackend().get(key, (value) => {
            if (value && value[key]) {
              resolve(value[key]);
            }
            resolve();
          });
        } catch (err) { reject(err); }
      }
    );
  }

  store(key, value) {
    return new Promise(
      (resolve, reject) => {
        try {
          this.getBackend().set({ [key]: value }, () => {
            resolve();
          });
        } catch (err) { reject(err); }
      }
    )
  }

  getBackend() {
    if (this.backend) {
      return this.backend;
    }
    if (window.chrome && window.chrome.storage) {
      this.backend = window.chrome.storage.sync;
    } else {
      this.backend = new MemoryStorageService();
    }
    return this.backend;
  }
}