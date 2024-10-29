import EventInterface from "../../@shared/event/event.interface";
import Address from "../entity/address";

type CustomerAddressChangedEventType = {
  id: string,
  name: string,
  endereco: Address
}
export class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerAddressChangedEventType;

  constructor(eventData: CustomerAddressChangedEventType) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }

}