import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderModule } from 'src/app/_shared/components/loader/loader.module';
import { MrlFormModule } from 'src/app/_shared/mrl-forms/mrl-forms.module';
import { CrudsServiceModule } from 'src/app/_shared/services/cruds/cruds-services.module';
import { PostCardModule } from '../../_shared/components/post/post-card.module';
import { PerfilRoutingModule } from './perfil-routing.module';

import { PerfilComponent } from './perfil.component';

@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    LoaderModule,
    CrudsServiceModule,
    PostCardModule,
    PerfilRoutingModule,
    MrlFormModule
  ]
})
export class PerfilModule {}
