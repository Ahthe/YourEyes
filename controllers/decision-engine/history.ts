import { addMilliseconds, isPast } from "date-fns";

export class DecisionHistory<T> {
  history: {
    [key: string]: {
      expiry: Date;
      item: T;
    };
  } = {};

  private addsSinceCleanup: number = 0;

  constructor() {}

  add(key: string, item: T, ttl: number) {
    this.history[key] = {
      expiry: addMilliseconds(new Date(), ttl),
      item,
    };
    this.addsSinceCleanup++;
    this.cleanup();
    console.log("[DECISION] history: added", key, item, ttl, this.history);
  }

  get(key: string) {
    const entry = this.history[key];
    if (!entry || isPast(entry.expiry)) {
      return null;
    }
    return entry;
  }

  cleanup() {
    if (this.addsSinceCleanup < 10) {
      return;
    }
    this.addsSinceCleanup = 0;
    for (const key in this.history) {
      if (isPast(this.history[key].expiry)) {
        delete this.history[key];
      }
    }
  }
}
