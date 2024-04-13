import SendEmailWhenProductIsCreatedHandler from "../../product/event/handlers/send-email-when-product-is-created";
import ProductCreatedEvent from "../../product/event/product-created";
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
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(eventDispatcher.handlers["ProductCreatedEvent"][0]).toMatchObject(
      eventHandler
    );

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
