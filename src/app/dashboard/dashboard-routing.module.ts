import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard/home',
        pathMatch: 'full'
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
