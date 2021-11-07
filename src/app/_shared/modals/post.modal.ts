import { User } from './user.modal';

export class Post {
  _id?: string;
  user: Partial<User>;
  title: string;
  text: string;
  agreed: Partial<User>[];
  disagreed: Partial<User>[];
}
