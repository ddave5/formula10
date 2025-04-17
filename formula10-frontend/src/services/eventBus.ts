type EventMap = {
  success: { message: string; isDialog: boolean };
  error: { message: string };
  // ide bármilyen egyedi eseménytípus jöhet
  [key: string]: unknown;
};

type EventCallback<K extends keyof EventMap> = (data: EventMap[K]) => void;

class EventBus {
  private events: {
    [K in keyof EventMap]?: EventCallback<K>[];
  } = {};

  on<K extends keyof EventMap>(event: K, callback: EventCallback<K>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    (this.events[event] as EventCallback<K>[]).push(callback);
  }

  emit<K extends keyof EventMap>(event: K, data: EventMap[K]) {
    const callbacks = this.events[event];
    if (callbacks) {
      for (const callback of callbacks) {
        callback(data);
      }
    }
  }

  off<K extends keyof EventMap>(event: K, callback: EventCallback<K>) {
    const callbacks = this.events[event];
    if (!callbacks) return;
    this.events[event] = callbacks.filter(cb => cb !== callback);
  }
}

const eventBus = new EventBus();
export default eventBus;