import { User } from "./user.modal";

export class Notification {
  _id?: string;
  user: Partial<User>;
  date: Date;
  text: string;
}
