import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MathjaxModule } from 'mathjax-angular';

import { LoaderModule } from 'src/app/_shared/components/loader/loader.module';
import { MrlFormModule } from 'src/app/_shared/mrl-forms/mrl-forms.module';
import { CrudsServiceModule } from 'src/app/_shared/services/cruds/cruds-services.module';
import { PostCardModule } from '../../../_shared/components/post/post-card.module';
import { PublishingPostRoutingModule } from './publishing-post-routing.module';

import { PublishingPostComponent } from './publishing-post.component';

@NgModule({
  declarations: [PublishingPostComponent],
  imports: [
    CommonModule,
    LoaderModule,
    MrlFormModule,
    CrudsServiceModule,
    PostCardModule,
    MathjaxModule.forChild(),
    PublishingPostRoutingModule
  ]
})
export class PublishingPostModule {}
