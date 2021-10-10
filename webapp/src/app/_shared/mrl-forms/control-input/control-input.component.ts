import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { FormControl } from "@angular/forms";

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

  @Output() focusOut = new EventEmitter<any>();

  individualId: string;

  constructor() {
    this.individualId = Math.random().toString(36).slice(2);
  }

  ngOnInit() { }

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
