class StorageHelper {
    static async get(key, fallback = undefined) {
      return new Promise((resolve) => {
        chrome.storage.local.get(key, (value) => {
          resolve(value?.[key] ?? fallback);
        });
      });
    }
  
    static async set(key, data) {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [key]: data }, () => {
          resolve(true);
        });
      });
    }
}