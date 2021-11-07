import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderModule } from 'src/app/_shared/components/loader/loader.module';
import { CrudsServiceModule } from 'src/app/_shared/services/cruds/cruds-services.module';
import { PostCardModule } from '../post/post-card.module';

import { PostsDisplayComponent } from './posts-display.component';

@NgModule({
  declarations: [PostsDisplayComponent],
  imports: [CommonModule, LoaderModule, CrudsServiceModule, PostCardModule],
  providers: [],
  exports: [PostsDisplayComponent]
})
export class PostsDisplayModule {}
