import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'mrl-what-is-this-place',
  templateUrl: './whatisthisplace.component.html',
  styleUrls: ['./whatisthisplace.component.scss']
})
export class WhatIsThisPlaceComponent implements OnInit {
  constructor(private meta: Meta, private title: Title) {}

  ngOnInit() {
    this.meta.addTags([
      { name: 'description', content: 'The new land of discoveries' },
      { name: 'author', content: 'Gabriel Miranda' },
      {
        name: 'keywords',
        content: 'matrel, math discoveries, math, mathematics, discoveries, gabriel miranda, homepage, what is matrel, mat rel'
      }
    ]);
    this.title.setTitle('MatRel - The new land of discoveries');
  }
}
