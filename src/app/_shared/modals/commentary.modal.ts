import { Post } from "./post.modal";
import { User } from "./user.modal";

export class Commentary {
  _id?: string;
  user: Partial<User>;
  post: Partial<Post>;
  text: string;
}
