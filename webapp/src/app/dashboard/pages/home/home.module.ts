import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderModule } from 'src/app/_shared/components/loader/loader.module';
import { MrlFormModule } from 'src/app/_shared/mrl-forms/mrl-forms.module';
import { CrudsServiceModule } from 'src/app/_shared/services/cruds/cruds-services.module';
import { PostCardModule } from '../../_shared/components/post/post-card.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    LoaderModule,
    CrudsServiceModule,
    PostCardModule,
    MrlFormModule,
    HomeRoutingModule,
  ],
})
export class HomeModule {}
