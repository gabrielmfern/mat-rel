import { Component, Input, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';

@Component({
  selector: 'mrl-control-check',
  templateUrl: './control-check.component.html',
  styleUrls: ['./control-check.component.scss']
})
export class ControlCheckComponent implements OnInit {
  @Input() control: FormControl;
  @Input() label: string;

  individualId: string;

  constructor() {
    this.individualId = Math.random().toString(36).slice(2);
  }

  ngOnInit() {}

  getInputId(): string {
    if (!this.hasLabel()) {
      return 'check' + this.individualId;
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
