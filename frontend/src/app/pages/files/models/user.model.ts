import { UserStatus } from "../enums/user-status.enum";

export class User {
 name: string;
 email: string;
 packages?: number[];
 status?: UserStatus;
  constructor(name: string, email: string, packages: number[], status: UserStatus) {
    this.name = name;
    this.email = email;
    this.status = status;
    this.packages = packages;
  }
}
