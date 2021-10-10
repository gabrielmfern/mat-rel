import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'publishing-post',
    loadChildren: () =>
      import('./pages/publishing-post/publishing-post.module').then(
        (m) => m.PublishingPostModule
      ),
  },
  {
    path: 'post',
    loadChildren: () =>
      import('./pages/post/post.module').then(
        (m) => m.PostModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
