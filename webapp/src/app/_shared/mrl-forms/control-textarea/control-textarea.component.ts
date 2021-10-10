import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

import { FormControl } from "@angular/forms";

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

  @Output() focusOut = new EventEmitter<any>();

  individualId: string;

  constructor() {
    this.individualId = Math.random().toString(36).slice(2);
  }

  ngOnInit() { }

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
