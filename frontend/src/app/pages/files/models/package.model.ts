import { User } from "./user.model";

export class Package {
 id: number;
 type: string;
 carrier: string;
 recipient?: User;
  constructor(type: string, id: number, carrier: string, recipient: User) {
    this.id = id;
    this.type = type;
    this.carrier = carrier;
    this.recipient = recipient;
  }
}
