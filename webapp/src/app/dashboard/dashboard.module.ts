import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LoaderModule } from '../_shared/components/loader/loader.module';
import { CrudsServiceModule } from '../_shared/services/cruds/cruds-services.module';
import { PostCardModule } from './_shared/components/post/post-card.module';
import { MrlFormModule } from '../_shared/mrl-forms/mrl-forms.module';

import { DashboardComponent } from './dashboard.component';
import { MathjaxModule } from 'mathjax-angular';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LoaderModule,
    MrlFormModule,
    CrudsServiceModule,
    PostCardModule,
    MathjaxModule.forRoot()
  ],
  declarations: [DashboardComponent],
  providers: [],
  exports: [],
})
export class DashboardModule {}
