import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MathjaxModule } from 'mathjax-angular';

import { LoaderModule } from 'src/app/_shared/components/loader/loader.module';
import { MrlFormModule } from 'src/app/_shared/mrl-forms/mrl-forms.module';
import { CrudsServiceModule } from 'src/app/_shared/services/cruds/cruds-services.module';
import { PostRoutingModule } from './post-routing.module';

import { PostComponent } from './post.component';

@NgModule({
  imports: [
    CommonModule,
    MrlFormModule,
    PostRoutingModule,
    CrudsServiceModule,
    LoaderModule,
    MathjaxModule.forChild()
  ],
  declarations: [PostComponent],
  providers: [],
})
export class PostModule {}
