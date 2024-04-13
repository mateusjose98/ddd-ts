import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private _handlers: EventHandlerType = {};

  get handlers(): EventHandlerType {
    return this._handlers;
  }
  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if (this._handlers[eventName]) {
      this._handlers[eventName].forEach((handler) => handler.handle(event));
    }
  }
  register(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (!this._handlers[eventName]) {
      this._handlers[eventName] = [];
    }
    this._handlers[eventName].push(eventHandler);
    console.log("Evento adicionado ", this.handlers);
  }
  unregister(
    eventName: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (this._handlers[eventName]) {
      const index = this._handlers[eventName].indexOf(eventHandler);
      if (index !== -1) {
        this._handlers[eventName].splice(index, 1);
      }
    }
  }
  unregisterAll(): void {
    this._handlers = {};
  }
}

type EventHandlerType = {
  [name: string]: EventHandlerInterface<EventInterface>[];
};
