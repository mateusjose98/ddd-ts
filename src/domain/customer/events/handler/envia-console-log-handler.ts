import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import EventInterface from "../../../@shared/event/event.interface";
import { CustomerAddressChangedEvent } from "../customer-address-changed";


export class EnviaConsoleLogHandler implements EventHandlerInterface {

  handle(event: CustomerAddressChangedEvent): void {
    const eventDate = event.eventData;
    console.log(`Endereço do cliente: ${eventDate.id}, ${eventDate.name} alterado para: ${eventDate.endereco}`);
  }



}