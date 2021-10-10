import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MathjaxModule } from 'mathjax-angular';

import { MrlFormModule } from 'src/app/_shared/mrl-forms/mrl-forms.module';
import { CrudsServiceModule } from 'src/app/_shared/services/cruds/cruds-services.module';
import { PublishingPostRoutingModule } from './publishing-post-routing.module';

import { PublishingPostComponent } from './publishing-post.component';

@NgModule({
  imports: [
    CommonModule,
    MrlFormModule,
    PublishingPostRoutingModule,
    CrudsServiceModule,
    MathjaxModule.forChild()
  ],
  declarations: [PublishingPostComponent],
  providers: [],
})
export class PublishingPostModule {}
