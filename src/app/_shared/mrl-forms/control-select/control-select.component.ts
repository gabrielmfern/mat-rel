import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mrl-control-select',
  templateUrl: './control-select.component.html',
  styleUrls: ['./control-select.component.scss']
})
export class ControlSelectComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() placement:
    | 'top'
    | 'top-left'
    | 'top-right'
    | 'bottom'
    | 'bottom-left'
    | 'bottom-right'
    | 'left'
    | 'left-top'
    | 'left-bottom'
    | 'right'
    | 'right-top'
    | 'right-bottom' = 'bottom';
  @Input() customErrorMessage: { [key: string]: string } = {};
  @Input() options: { name: string; value: any }[] = [];
  @Input() validate = true;

  individualId: string;

  errorMessage = '';
  valid: boolean;

  constructor() {
    this.individualId = Math.random().toString(36).slice(2);
  }

  ngOnInit() {
    this.options.push({
      name: '',
      value: ''
    });
  }

  isEqualTo(object1: any, object2: any) {
    if (typeof object1 === 'string') {
      return object1 == object2;
    } else if (typeof object1 === 'object') {
      const keysObject1 = Object.keys(object1);
      const keysObject2 = Object.keys(object2);

      if (keysObject1.length != keysObject2.length) return false;
      if (keysObject1.filter((key) => keysObject2.includes(key)).length < keysObject1.length) return false;
      return keysObject1.filter((key, i) => this.isEqualTo(object1[key], object2[keysObject2[i]]));
    }
  }

  isSelectedOption(value: any): boolean {
    return this.isEqualTo(this.control.value, value);
  }

  patchOptionTo(value: any) {
    if (this.validate) {
      this.setErrorMessageAndValidState();
    }
    this.control.patchValue(value);
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
      return `This field has a maximum amount of ${this.control.errors.manlength.requiredLength} characters!`;
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
