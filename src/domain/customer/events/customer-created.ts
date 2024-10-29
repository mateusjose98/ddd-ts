import EventInterface from "../../@shared/event/event.interface";
import Customer from "../entity/customer";

export class CustomerCreatedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }

}