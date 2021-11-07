import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoggedInGuard } from './_shared/guards/logged-in.guard';
import { LoggedOutGuard } from './_shared/guards/logged-out.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/home'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [LoggedInGuard]
  },
  {
    path: 'security',
    loadChildren: () => import('./security/security.module').then((m) => m.SecurityModule),
    canActivate: [LoggedOutGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
