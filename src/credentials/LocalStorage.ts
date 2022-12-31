export interface LocalStorage {
  get<T = unknown>(key: string): T | null;
  set(key: string, value: unknown): void;
  remove(key: string): void;
}

class InMemoryStorage implements LocalStorage {
  private db: Map<string, unknown> = new Map();

  get<T = unknown>(key: string): T | null {
    return (this.db.get(key) as T) || null;
  }

  set<T = unknown>(key: string, value: T) {
    this.db.set(key, value);
  }

  remove(key: string) {
    this.db.delete(key);
  }
}

class BrowserLocalStorage implements LocalStorage {
  get<T = unknown>(key: string): T | null {
    const value = window.localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value) as T;
  }

  set<T = unknown>(key: string, value: T) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }
}

export default function get(type: "local" | "inmemory"): LocalStorage {
  if (type === "inmemory") return new InMemoryStorage();
  try {
    /* eslint-disable-next-line */
    const _ = window.localStorage;
    return new BrowserLocalStorage();
  } catch {
    return new InMemoryStorage();
  }
}
