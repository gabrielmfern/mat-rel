import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { ControlInputComponent } from './control-input/control-input.component';
import { ControlCheckComponent } from './control-check/control-check.component';
import { ControlTextareaComponent } from './control-textarea/control-textarea.component';
import { ControlSelectComponent } from './control-select/control-select.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, NgbDropdownModule],
  declarations: [
    ControlInputComponent,
    ControlCheckComponent,
    ControlTextareaComponent,
    ControlSelectComponent
  ],
  exports: [
    ReactiveFormsModule,
    ControlCheckComponent,
    ControlInputComponent,
    ControlTextareaComponent,
    ControlSelectComponent
  ]
})
export class MrlFormModule {}
