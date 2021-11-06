import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PostComponent } from './pages/post/post.component';
import { PublishingPostComponent } from './pages/publishing-post/publishing-post.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'perfil',
        component: PerfilComponent,
      },
      // {
      //   path: 'publishing-post',
      //   component: PublishingPostComponent
      // },
      // {
      //   path: 'publishing-post/:id',
      //   component: PublishingPostComponent
      // },
      {
        path: 'publishing-post',
        loadChildren: () =>
          import('./pages/publishing-post/publishing-post.module').then(
            (m) => m.PublishingPostModule
          ),
      },
      {
        path: 'post/:id',
        component: PostComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
