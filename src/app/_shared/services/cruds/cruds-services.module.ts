import { NgModule } from '@angular/core';

import { CommentaryService } from './commentary.service';
import { PostService } from './post.service';
import { UserService } from './user.service';

@NgModule({
  providers: [PostService, CommentaryService, UserService]
})
export class CrudsServiceModule {}
