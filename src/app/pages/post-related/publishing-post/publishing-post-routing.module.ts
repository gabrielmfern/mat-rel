import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PublishingPostComponent } from './publishing-post.component';

import { ConfirmLeavingGuard } from 'src/app/_shared/guards/confirm-leaving.guard';

const routes: Routes = [
  {
    path: '',
    component: PublishingPostComponent,
    canDeactivate: [ConfirmLeavingGuard]
  },
  {
    path: ':id',
    component: PublishingPostComponent,
    canDeactivate: [ConfirmLeavingGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublishingPostRoutingModule {}
