import { NgModule } from '@angular/core';

import { CommentaryService } from './commentary.service';
import { PostService } from './post.service';

@NgModule({
  providers: [PostService, CommentaryService]
})
export class CrudsServiceModule {}
