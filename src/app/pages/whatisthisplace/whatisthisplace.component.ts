import { Component, OnInit } from '@angular/core';

import { MetaService } from './../../_shared/services/meta.service';

@Component({
  selector: 'mrl-what-is-this-place',
  templateUrl: './whatisthisplace.component.html',
  styleUrls: ['./whatisthisplace.component.scss']
})
export class WhatIsThisPlaceComponent implements OnInit {
  constructor(private metaService: MetaService) {}

  ngOnInit() {
    this.metaService.setTag('description', 'The new land of discoveries');
    this.metaService.setTag('author', 'Gabriel Miranda');
    this.metaService.setTag('url', 'https://mat-rel.com/#/whatisthisplace');
    this.metaService.setTag('keywords', 'matrel, math discoveries, math, mathematics, discoveries, gabriel miranda, homepage, what is matrel, mat rel');
    this.metaService.setTitle('The new land of discoveries');
  }
}
