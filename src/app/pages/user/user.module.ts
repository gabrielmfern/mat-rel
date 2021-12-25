import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoaderModule } from 'src/app/_shared/components/loader/loader.module';
import { CrudsServiceModule } from 'src/app/_shared/services/cruds/cruds-services.module';
import { PostsDisplayModule } from '../../_shared/components/posts-display/posts-display.module';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    LoaderModule,
    CrudsServiceModule,
    PostsDisplayModule,
    UserRoutingModule
  ]
})
export class UserModule {}
