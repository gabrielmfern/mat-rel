import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'mrl-control-input',
  templateUrl: './control-input.component.html',
  styleUrls: ['./control-input.component.scss']
})
export class ControlInputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() type: 'text' | 'number' | 'email' | 'number' | 'password' = 'text';
  @Input() label: string;
  @Input() placeholder: string;

  @Input() customErrorMessage: { [key: string]: string } = {};

  @Input() validate = true;

  @Output() focusOut = new EventEmitter<any>();

  individualId: string;

  errorMessage = '';
  valid: boolean;

  constructor() {
    this.individualId = Math.random().toString(36).slice(2);
  }

  ngOnInit() {}

  onFocusedOut($event) {
    this.focusOut.emit($event);
    if (this.validate) {
      this.setErrorMessageAndValidState();
    }
  }

  setErrorMessageAndValidState() {
    this.errorMessage = this.getErrorMessage();
    this.valid = this.isValid();
  }

  getErrorMessage() {
    if (!this.control.errors) return '';

    if (this.control.errors?.required) {
      return 'This field is required!';
    } else if (this.control.errors?.minlength) {
      return `This field needs to have at least ${this.control.errors.minlength.requiredLength} characters!`;
    } else if (this.control.errors?.maxlength) {
      return `This field has a maximum amount of ${this.control.errors.minlength.requiredLength} characters!`;
    } else if (this.control.errors?.min) {
      return 'This field has a minimum value!';
    } else if (this.control.errors?.max) {
      return 'This field has a maximum value!';
    }

    const errorKeys = Object.keys(this.customErrorMessage);

    for (let i = 0; i < errorKeys.length; i++) {
      if (this.control.errors[errorKeys[i]]) {
        return this.customErrorMessage[errorKeys[i]];
      }
    }

    return 'There is a problem with this field!';
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
