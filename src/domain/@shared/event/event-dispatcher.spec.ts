import SendEmailWhenProductIsCreatedHandler from "../../product/event/handlers/send-email-when-product-is-created";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("product-created", eventHandler);

    expect(eventDispatcher.handlers["product-created"]).toBeDefined();
    expect(eventDispatcher.handlers["product-created"].length).toBe(1);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("product-created", eventHandler);
    eventDispatcher.unregister("product-created", eventHandler);

    expect(eventDispatcher.handlers["product-created"].length).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("product-created", eventHandler);
    eventDispatcher.unregisterAll();

    expect(eventDispatcher.handlers).toEqual({});
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  });
});
