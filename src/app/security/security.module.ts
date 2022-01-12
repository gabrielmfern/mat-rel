import { NgModule } from '@angular/core';

import { SecurityRoutingModule } from './security-routing.module';

import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CommonModule } from '@angular/common';

import { MrlFormModule } from '../_shared/mrl-forms/mrl-forms.module';
import { LoaderModule } from '../_shared/components/loader/loader.module';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

@NgModule({
  imports: [CommonModule, MrlFormModule, SecurityRoutingModule, LoaderModule],
  declarations: [LoginComponent, CreateAccountComponent, VerifyAccountComponent],
  providers: []
})
export class SecurityModule {}
