import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MathjaxModule } from 'mathjax-angular';

import { LoaderModule } from 'src/app/_shared/components/loader/loader.module';
import { CrudsServiceModule } from 'src/app/_shared/services/cruds/cruds-services.module';
import { PostRoutingModule } from './post-routing.module';

import { PostComponent } from './post.component';

@NgModule({
  declarations: [
    PostComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    CrudsServiceModule,
    MathjaxModule.forChild(),
    PostRoutingModule
  ]
})
export class PostModule {}
