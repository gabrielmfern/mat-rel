import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DonateRoutingModule } from './donate-routing.module';

import { DonateComponent } from './donate.component';

@NgModule({
  declarations: [DonateComponent],
  imports: [CommonModule, DonateRoutingModule]
})
export class DonateModule {}
