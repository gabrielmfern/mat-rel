import { Post } from './post.modal';
import { User } from './user.modal';

export class Thread {
  _id?: string;
  title: string;
  creator: Partial<User>;
  like: number;
  dislike: number;
  posts: Partial<Post>[];
}
