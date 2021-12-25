import { Component, OnInit } from '@angular/core';

import { MetaService } from 'src/app/_shared/services/meta.service';

@Component({
  selector: 'mrl-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonateComponent implements OnInit {
  constructor(private metaService: MetaService) { }

  ngOnInit() {
    this.metaService.setTag('description', 'The new land of discoveries');
    this.metaService.setTag('author', 'Gabriel Miranda');
    this.metaService.setTag('url', 'https://mat-rel.com/donate');
    this.metaService.setTag('keywords', 'matrel, math discoveries, math, mathematics, discoveries, gabriel miranda, mat rel, donate, patreon, become a patreon, donate to matrel, matrel donation, donation');
    this.metaService.setTitle('Become a Patreon');
  }
}
