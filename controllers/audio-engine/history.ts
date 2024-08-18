/**
 * Keeps track of last n entries added to an array
 */
export class History<T> {
  private history: T[] = [];
  private size: number;
  private ttl: number;

  constructor(size: number, ttl: number = 0) {
    this.size = size;
    this.ttl = ttl;
  }

  /**
   * Adds an entry to the history
   */
  add(entry: T) {
    this.history.push(entry);
    if (this.history.length > this.size) {
      this.history.shift();
    }
    this.purgeExpired();

    return this;
  }

  /**
   * Returns the history
   */
  get() {
    this.purgeExpired();
    return this.history;
  }

  /**
   * Clears the history
   */
  clear() {
    this.history = [];
    return this;
  }

  getArray() {
    return this.history;
  }

  getLatest() {
    return this.history[this.history.length - 1];
  }

  private purgeExpired() {
    if (this.ttl === 0) return;
    const now = Date.now();
    this.history = this.history.filter((entry) => {
      return now - this.ttl < now;
    });
  }
}
