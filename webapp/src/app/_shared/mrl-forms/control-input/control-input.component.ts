import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'mrl-control-input',
  templateUrl: './control-input.component.html',
  styleUrls: ['./control-input.component.scss'],
})
export class ControlInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() type: 'text' | 'number' | 'email' | 'number' | 'password' = 'text';
  @Input() label: string;
  @Input() placeholder: string;

  @Output() focusOut = new EventEmitter<any>();

  individualId: string;

  constructor() {
    this.individualId = Math.random().toString(36).slice(2);
  }

  ngOnInit() {}

  getErrorMessage() {
    if (this.control.errors?.required) {
      return 'Este campo é requirido!';
    } else if (this.control.errors?.minlength) {
      return `Este campo precisa de no minímo ${this.control.errors.minlength.requiredLength} caracteres!`;
    } else if (this.control.errors?.maxlength) {
      return `Este campo tem um máximo de ${this.control.errors.minlength.requiredLength} caracteres!`;
    } else if (this.control.errors?.min) {
      return 'Este campo tem um valor minímo!';
    } else if (this.control.errors?.max) {
      return 'Este campo tem um valor máximo!';
    }

    return 'Existe um problema com este campo!';
  }

  isValid() {
    return this.control.valid;
  }

  isInvalid() {
    return this.control.invalid;
  }

  getInputId(): string {
    if (!this.hasLabel()) {
      return this.type + this.individualId;
    } else {
      return this.label + this.individualId;
    }
  }

  hasLabel(): boolean {
    if (this.label === '' || !this.label || typeof this.label === 'undefined') {
      return false;
    }

    return true;
  }
}
