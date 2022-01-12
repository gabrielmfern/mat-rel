
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';

import { LoggedOutGuard } from '../_shared/guards/logged-out.guard';
import { LoggedInGuard } from '../_shared/guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [LoggedOutGuard]
  },
  {
    path: 'verify-account',
    component: VerifyAccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule {}
