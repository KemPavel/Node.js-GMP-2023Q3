class EventEmitter {
  listeners = {};

  addListener(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(fn);
    return this;
  }

  on(eventName, fn) {
    return this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    if (eventName in this.listeners) {
      const index = this.listeners[eventName].findIndex((listener) => listener === fn);
      this.listeners[eventName].splice(index, 1);
    }
    return this;
  }

  removeAllListeners(eventName, fn) {
    delete this.listeners[eventName];
    fn();
  }

  off(eventName, fn) {
    return this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || [];
    this.listeners[eventName].push(() => {
      fn();
      this.removeListener(eventName, fn);
    });
    return this;
  }

  // Returns true if the event had listeners, false otherwise.
  emit(eventName, ...args) {
    if (eventName in this.listeners) {
      this.listeners[eventName].forEach((fn) => fn(...args));
      return true;
    }
    return false;
  }

  listenerCount(eventName) {
    if (eventName in this.listeners) {
      return this.listeners[eventName].length;
    }
    return 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName];
  }
}

export default EventEmitter;
