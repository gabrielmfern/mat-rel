import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'mrl-control-textarea',
  templateUrl: './control-textarea.component.html',
  styleUrls: ['./control-textarea.component.scss']
})
export class ControlTextareaComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() rows: number = 10;
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

    const errorKeys = Object.keys(this.customErrorMessage);

    for (let i = 0; i < errorKeys.length; i++) {
      if (this.control.errors[errorKeys[i]]) {
        return this.customErrorMessage[errorKeys[i]];
      }
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
      return 'textarea' + this.individualId;
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
