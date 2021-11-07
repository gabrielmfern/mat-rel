import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MathjaxModule } from 'mathjax-angular';

import { NavbarComponent } from './parts/navbar/navbar.component';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule, NgbDropdownModule, MathjaxModule.forRoot()],
  declarations: [DashboardComponent, NavbarComponent],
  providers: [],
  exports: []
})
export class DashboardModule {}
