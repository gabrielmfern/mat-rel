import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { MathjaxModule } from 'mathjax-angular';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LoaderModule } from '../_shared/components/loader/loader.module';
import { CrudsServiceModule } from '../_shared/services/cruds/cruds-services.module';
import { PostCardModule } from './_shared/components/post/post-card.module';
import { MrlFormModule } from '../_shared/mrl-forms/mrl-forms.module';

import { DashboardComponent } from './dashboard.component';
import { NavbarComponent } from './parts/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { PublishingPostComponent } from './pages/publishing-post/publishing-post.component';
import { PostComponent } from './pages/post/post.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LoaderModule,
    MrlFormModule,
    CrudsServiceModule,
    NgbDropdownModule,
    PostCardModule,
    MathjaxModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    // PublishingPostComponent,
    PostComponent,
    PerfilComponent
  ],
  providers: [],
  exports: [],
})
export class DashboardModule {}
