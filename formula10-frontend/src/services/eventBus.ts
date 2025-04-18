export type EventMap = {
  error: { message: string; isDialog: boolean };
  success: { message: string };
};

type EventCallback<T> = (data: T) => void;

class EventBus<EM extends Record<string, unknown>> {
  private events: { [K in keyof EM]?: EventCallback<EM[K]>[] } = {};

  on<K extends keyof EM>(event: K, callback: EventCallback<EM[K]>) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit<K extends keyof EM>(event: K, data: EM[K]) {
    const callbacks = this.events[event];
    if (callbacks) {
      for (const callback of callbacks) {
        callback(data);
      }
    }
  }

  off<K extends keyof EM>(event: K, callback: EventCallback<EM[K]>) {
    const callbacks = this.events[event];
    if (!callbacks) return;
    this.events[event] = callbacks.filter(cb => cb !== callback);
  }
}

const eventBus = new EventBus<EventMap>();
export default eventBus;