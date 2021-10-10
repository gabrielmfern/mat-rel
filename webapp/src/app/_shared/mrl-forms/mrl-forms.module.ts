import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ControlInputComponent } from './control-input/control-input.component';
import { ControlCheckComponent } from './control-check/control-check.component';
import { ControlTextareaComponent } from './control-textarea/control-textarea.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    ControlInputComponent,
    ControlCheckComponent,
    ControlTextareaComponent,
  ],
  exports: [
    ReactiveFormsModule,
    ControlCheckComponent,
    ControlInputComponent,
    ControlTextareaComponent,
  ],
})
export class MrlFormModule {}
