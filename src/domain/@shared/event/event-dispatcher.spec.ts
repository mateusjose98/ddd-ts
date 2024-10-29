import Customer from "../../customer/entity/customer";
import { CustomerCreatedEvent } from "../../customer/events/customer-created";
import { EnviaConsoleLog1Handler } from "../../customer/events/handler/envia-console-log1-handler";
import { EnviaConsoleLog2Handler } from "../../customer/events/handler/envia-console-log2-handler";
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

  it("should notify consolelog 1 and 2 event handlers when CustomerCreated", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();
    const eventName = "CustomerCreatedEvent";
    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    eventDispatcher.register(eventName, eventHandler1);
    eventDispatcher.register(eventName, eventHandler2);

    expect(eventDispatcher.handlers[eventName]).toMatchObject(
      [eventHandler1, eventHandler2]
    );

    eventDispatcher.notify(new CustomerCreatedEvent(new Customer("1", "John Doe")));
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();

  })
});
