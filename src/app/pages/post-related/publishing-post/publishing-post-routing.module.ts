import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublishingPostComponent } from './publishing-post.component';

const routes: Routes = [
  {
    path: '',
    component: PublishingPostComponent
  },
  {
    path: ':id',
    component: PublishingPostComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishingPostRoutingModule {}
