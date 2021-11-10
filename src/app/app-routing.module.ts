import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoggedInGuard } from './_shared/guards/logged-in.guard';
import { LoggedOutGuard } from './_shared/guards/logged-out.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then((m) => m.PerfilModule)
  },
  {
    path: 'publishing-post',
    loadChildren: () =>
      import('./pages/post-related/publishing-post/publishing-post.module').then(
        (m) => m.PublishingPostModule
      )
  },
  {
    path: 'post/:id',
    loadChildren: () => import('./pages/post-related/post/post.module').then((m) => m.PostModule)
  },
  {
    path: 'donate',
    loadChildren: () => import('./pages/donate/donate.module').then((m) => m.DonateModule)
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
