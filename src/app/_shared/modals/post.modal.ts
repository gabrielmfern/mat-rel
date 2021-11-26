import { User } from './user.modal';

export class Post {
  _id?: string;
  user: Partial<User>;
  title: string;
  text: string;
  tags: string;
  publishingDate: Date;
  public: boolean;
  agreed: Partial<User>[];
  disagreed: Partial<User>[];
}
