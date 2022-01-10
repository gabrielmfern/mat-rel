import { NgModule } from '@angular/core';

import { CommentaryService } from './commentary.service';
import { NotificationService } from './notification.service';
import { PostService } from './post.service';
import { UserService } from './user.service';

@NgModule({
  providers: [PostService, CommentaryService, UserService, NotificationService]
})
export class CrudsServiceModule {}
