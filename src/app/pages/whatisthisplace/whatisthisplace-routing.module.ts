import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WhatIsThisPlaceComponent } from './whatisthisplace.component';

const routes: Routes = [
  {
    path: '',
    component: WhatIsThisPlaceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WhatIsThisPlaceRoutingModule {}
