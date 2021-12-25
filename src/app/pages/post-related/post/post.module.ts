import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderModule } from 'src/app/_shared/components/loader/loader.module';
import { CrudsServiceModule } from 'src/app/_shared/services/cruds/cruds-services.module';
import { PostRoutingModule } from './post-routing.module';
import { MrlFormModule } from 'src/app/_shared/mrl-forms/mrl-forms.module';

import { PostComponent } from './post.component';
import { CommentaryListComponent } from './parts/commentary-list/commentary-list.component';
import { MathjaxModule } from 'src/app/_shared/mathjax/mathjax.module';

@NgModule({
  declarations: [PostComponent, CommentaryListComponent],
  imports: [
    CommonModule,
    LoaderModule,
    CrudsServiceModule,
    MathjaxModule.forChild(),
    PostRoutingModule,
    MrlFormModule
  ]
})
export class PostModule {}
