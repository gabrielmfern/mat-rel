import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WhatIsThisPlaceRoutingModule } from './whatisthisplace-routing.module';

import { WhatIsThisPlaceComponent } from './whatisthisplace.component';

@NgModule({
  declarations: [WhatIsThisPlaceComponent],
  imports: [
    CommonModule,
    WhatIsThisPlaceRoutingModule
  ]
})
export class WhatIsThisPlaceModule { }
